import React, {useCallback, useContext, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { eel } from '../App'
import PortfolioMarket from '../components/portfolioMarket/PortfolioMarket'
import PortfolioSidebar from '../components/sidebar/PortfolioSidebar'
import Loader from '../components/UI/loader/Loader'
import { Context } from '../context'
import { useShares, useSecurities, useBonds, useForeignShares, useSortedByMarketAndBoardSecurities } from '../hooks/useSecurities'
import { exchangeTypes, screenTypes } from '../utils/securitiesListTypes'

export default function Portfolio() {
    const [userSecurities, setUserSecurities] = useState([])    
    const [securitiesFromDB, setSecuritiesFromDB] = useState([])
    const { user, setLoginModalVisible, portfolioSortAndFilter } = useContext(Context)
    const [isSecuritiesLoading, setIsSecuritiesLoading] = useState(true)
    const [isSharesCollapsed, setIsSharesCollapsed] = useState(false)
    const [isBondsCollapsed, setIsBondsCollapsed] = useState(false)
    const [isFSharesCollapsed, setIsFSharesCollapsed] = useState(false)

    useEffect(() => {
        setIsSecuritiesLoading(true)
        eel.get_user_securities(user.id)().then(res => { if(res.length === 0) setIsSecuritiesLoading(false); setSecuritiesFromDB(res) })
    }, [user])

    const sortedByMarketAndBoardSecurities = useSortedByMarketAndBoardSecurities(securitiesFromDB)

    const getUserSecurities = useCallback(
        async () => {            
            let result = []
            for (const [mkey, mvalue] of Object.entries(sortedByMarketAndBoardSecurities)) 
                for (const [bkey, bvalue] of Object.entries(mvalue)) {
                    const moexResult = await eel.get_required_securities_list(mkey, bkey, bvalue.map(bv => bv.tiker))()                    
                    result = [...result, ...moexResult.map(sec => {
                        const dbSec = bvalue.find(bv => bv.tiker === sec.SECID.toLowerCase())
                        return {
                            ...sec,
                            market: mkey,
                            board: bkey,
                            count: dbSec.count,
                            total: dbSec.count * sec.LAST
                        }
                    })]
                }            
            setUserSecurities(result)
            setIsSecuritiesLoading(false)
        },
        [sortedByMarketAndBoardSecurities]
    )    
    useEffect(() => {        
        if (securitiesFromDB.length !== 0) {
            getUserSecurities()
        }
        else
            setUserSecurities([])
        const id = setInterval(() => {            
            if (securitiesFromDB.length !== 0) {
                getUserSecurities()
            }
            else
                setUserSecurities([])
        }, 60*1000)
        return () => {
            clearInterval(id)
        }
    }, [securitiesFromDB, getUserSecurities])

    const sortedAndSearchedSecurities = useSecurities(userSecurities, portfolioSortAndFilter.sort, portfolioSortAndFilter.searchQuery)

    const shares = useShares(sortedAndSearchedSecurities)
    const bonds = useBonds(sortedAndSearchedSecurities)
    const foreignShares = useForeignShares(sortedAndSearchedSecurities)

    return (
        <div className="portfolio">
            <h1 className="header">????????????????</h1>
            {
                Object.keys(user).length !== 0 ?
                    (
                        isSecuritiesLoading ?
                            <Loader></Loader>
                            :
                            <div className="portfolio__wrapper">
                                {
                                userSecurities.length === 0 ?
                                    <div className="portfolio_empty">
                                        ???????????????????????????? ???????????????? ????????. ???????????????? ???????????? ???????????? ?????????? ????&nbsp;
                                        <Link className="portfolio__exchange-link" to='/Exchange'>            
                                            ??????????
                                        </Link>
                                    </div>
                                    :
                                    <div className="portfolio__body">
                                        <div className="portfolio__lists">
                                            {
                                                shares.length !== 0 &&
                                                    <PortfolioMarket
                                                        screenType={screenTypes.portfolio}
                                                        listType={exchangeTypes.shares}
                                                        securities={shares}
                                                        collapsed={isSharesCollapsed}
                                                        setCollapsed={setIsSharesCollapsed}
                                                        title='??????????' />
                                            }
                                            {
                                                bonds.length !== 0 &&
                                                <PortfolioMarket
                                                        screenType={screenTypes.portfolio}
                                                        listType={exchangeTypes.bonds}
                                                        securities={bonds}
                                                        collapsed={isBondsCollapsed}
                                                        setCollapsed={setIsBondsCollapsed}
                                                        title='??????????????????' />
                                            }
                                            {
                                                foreignShares.length !== 0 &&
                                                <PortfolioMarket
                                                        screenType={screenTypes.portfolio}
                                                        listType={exchangeTypes.foreignShares}
                                                        securities={foreignShares}
                                                        collapsed={isFSharesCollapsed}
                                                        setCollapsed={setIsFSharesCollapsed}
                                                        title='?????????????????????? ???????????? ????????????' />
                                            }
                                        </div>
                                            <PortfolioSidebar
                                                secCount={userSecurities.reduce((acc, sec) => acc + sec.count, 0)}
                                                totalPrice={userSecurities.reduce((acc, sec) => acc + sec.total, 0).toFixed()}/>
                                    </div>                        
                                }                        
                            </div>
                    )
                    :
                    <div className="portfolio_no-logged-in-user">
                        ?????????? ?????????????? ?????????????????????? ???????????? ????????????, ??????????&nbsp;
                        <span onClick={() => setLoginModalVisible(true)}>??????????</span>
                    </div>                    
            }            
        </div>
    )
}
