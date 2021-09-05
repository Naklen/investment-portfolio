import { useMemo } from "react";

export const useSortedSecurities = (securities, sort) => {
    const sortedSecurities = useMemo(() => {
        if (sort.option) {
            return [...securities].sort((a, b) => {
                const descendingCoeff = sort.isDescending ? -1 : 1
                if (a[sort.option]) {
                    if (!b[sort.option])
                        return -1; //if b is null then a must be placed before it
                    if ((typeof a[sort.option]) === 'number')
                        return (a[sort.option] - b[sort.option]) * descendingCoeff;                    
                    return a[sort.option].localeCompare(b[sort.option]) * descendingCoeff;
                }
                return 1; //if a is null then it must be placed after b
            });
        }            
        return securities;
    }, [sort, securities]);

    return sortedSecurities;
}

export const useSecurities = (securities, sort, searchQuery) => {
    const sortedSecurities = useSortedSecurities(securities, sort);

    const sortedAndSearchedSecurities = useMemo(() => {
        return sortedSecurities.filter((sec) => {
            return sec.SECID.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sec.SHORTNAME.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sec.SECNAME.toLowerCase().includes(searchQuery.toLowerCase()) ||
                sec.LATNAME.toLowerCase().includes(searchQuery.toLowerCase())
        });
    }, [searchQuery, sortedSecurities]);

    return sortedAndSearchedSecurities;
}

export const useSortedByMarketAndBoardSecurities = (securitiesFromDB) => {
    const sortedByMarketAndBoardSecurities = useMemo(() => {
        let s = {};
        for (let userSec of securitiesFromDB) {            
            let sec = userSec.security            
            if (!s.hasOwnProperty(sec.market))
                s[sec.market] = {};
            if (!s[sec.market].hasOwnProperty(sec.board))
                s[sec.market][sec.board] = [];
            s[sec.market][sec.board].push({tiker: sec.secid, count: userSec.count});
        }
        return s;
    }, [securitiesFromDB]);    
    return sortedByMarketAndBoardSecurities;
}

export const useMarket = (securities, marketName) => {
    const market = useMemo(() => {
        if (securities.length !== 0)
            return securities.filter(sec => sec.market === marketName);
        else return []
    }, [securities, marketName]);
    return market;
}

export const useShares = (securities) => {
    return useMarket(securities, 'shares');
}

export const useBonds = (securities) => {
    return useMarket(securities, 'bonds');
}

export const useForeignShares = (securities) => {
    return useMarket(securities, 'foreignshares');
}