import React, {useState, useEffect, useContext} from 'react'
import { eel } from '../App'
import SecuritiesList from '../components/SecuritiesList'
import ExchangeSidebar from '../components/sidebar/ExchangeSidebar'
import Loader from '../components/UI/loader/Loader'
import { Context } from '../context'
import { useSecurities } from '../hooks/useSecurities'
import { screenTypes } from '../utils/securitiesListTypes'


export default function Exchange() {
    const [securities, setSecurities] = useState([])
    const { exchangeState } = useContext(Context)
    const [isSecuritiesLoading, setIsSecuritiesLoading] = useState(true)

    useEffect(() => {
        setSpecifiedSecurities(exchangeState.market, exchangeState.board)
        const id = setInterval(() => {            
            setSpecifiedSecurities(exchangeState.market, exchangeState.board)
        }, 60*1000)
        return () => {
            clearInterval(id)
        }
    }, [exchangeState.market, exchangeState.board])    

    const sortedAndSearchedSecurities = useSecurities(securities, exchangeState.sort, exchangeState.searchQuery)    

    async function setSpecifiedSecurities(market, board) {
        console.log('get')
        setSecurities(await eel.get_securities_list(market, board)())
        setIsSecuritiesLoading(false)
    }

    return (        
        <div className="exchange">
            <h1 className="header">Биржа</h1>
            {
                isSecuritiesLoading ?
                    <div className="exchange_loading">
                        <Loader></Loader>
                    </div>
                    :
                    <div className="exchange__body">
                        <SecuritiesList listType={exchangeState.market}
                            screenType={screenTypes.exchange}
                            securities={sortedAndSearchedSecurities}>                            
                        </SecuritiesList>
                        <ExchangeSidebar />
                    </div>
            }              
        </div>        
    )
}
