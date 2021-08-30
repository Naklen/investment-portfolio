import React, {useState, useEffect, useContext} from 'react'
import { eel } from '../App'
import SecuritiesList from '../components/SecuritiesList'
import ExchangeSidebar from '../components/sidebar/ExchangeSidebar'
import { ExchangeContext } from '../context'


export default function Exchange() {
    const [securities, setSecurities] = useState([])
    const {exchangeState} = useContext(ExchangeContext)

    useEffect(() => {
        setSpecifiedSecurities(exchangeState.market, exchangeState.board)
        const id = setInterval(() => {            
            setSpecifiedSecurities(exchangeState.market, exchangeState.board)
        }, 60*1000)
        return () => {
            clearInterval(id)
        }
    }, [exchangeState])

    async function setSpecifiedSecurities(market, board) {        
        setSecurities(await eel.get_securities_list(market, board)())
    }

    return (        
        <div className="exchange">
            <h1 className="exchange__title header">Биржа</h1>
            <div className="exchange__body">
                <SecuritiesList securities={securities}></SecuritiesList>
                <ExchangeSidebar />
            </div>                
        </div>        
    )
}
