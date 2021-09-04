import React, {useCallback, useContext, useEffect, useState} from 'react'
import { eel } from '../App'
import SecuritiesList from '../components/SecuritiesList'
import PortfolioSidebar from '../components/sidebar/PortfolioSidebar'
import { Context } from '../context'
import { useSortedByMarketAndBoardSecurities } from '../hooks/useSecurities'

export default function Portfolio() {
    const [userSecurities, setUserSecurities] = useState([])    
    const [securitiesFromDB, setSecuritiesFromDB] = useState([])
    const { user } = useContext(Context)   

    useEffect(() => {
        console.log('us')
        eel.get_user_securities(user.id)().then(res => setSecuritiesFromDB(res))        
    }, [user])

    const sortedByMarketAndBoardSecurities = useSortedByMarketAndBoardSecurities(securitiesFromDB)

    const getUserSecurities = useCallback(
        async () => {
            console.log(sortedByMarketAndBoardSecurities)
            let result = []
            for (const [mkey, mvalue] of Object.entries(sortedByMarketAndBoardSecurities)) 
                for (const [bkey, bvalue] of Object.entries(mvalue)) {
                    const moexResult = await eel.get_required_securities_list(mkey, bkey, bvalue)()
                    result = [...result, ...moexResult]
                }
            console.log('cb')
            setUserSecurities(result)
        },
        [sortedByMarketAndBoardSecurities]
    )    

    useEffect(() => {
        console.log('sec')
        if (securitiesFromDB.length !== 0) {
            getUserSecurities()
        }
        const id = setInterval(() => {            
            if (securitiesFromDB.length !== 0) {
                getUserSecurities()
            }
        }, 60*1000)
        return () => {
            clearInterval(id)
        }
    }, [securitiesFromDB, getUserSecurities])

    return (
        <div>
            <h1 className="header">Портфель</h1>
            <div className="portfolio__wrapper">
                {
                    userSecurities.length === 0
                        ?
                        <div className="">
                            Нема
                        </div>
                        :
                        <div className="portfolio__body">
                            <SecuritiesList securities={userSecurities}></SecuritiesList>
                        </div>                        
                }
            </div>
            <PortfolioSidebar/>
        </div>
    )
}
