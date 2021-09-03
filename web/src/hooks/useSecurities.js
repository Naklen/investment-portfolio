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