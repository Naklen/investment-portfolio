import React, {useState, useEffect} from 'react'
import { eel } from '../App'
import SecuritiesList from '../components/SecuritiesList'
import { ExchangeContext } from '../context'

export default function Exchange() {
    const [securities, setSecurities] = useState([])
    const [exchangeState, setExchangeState] = useState({ market: 'shares', board: 'tqbr' })

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
        console.log('rab')
        setSecurities(await eel.get_securities_list(market, board)())
    }

    return (
    <ExchangeContext.Provider value={{
      exchangeState,
      setExchangeState
    }}>
        <div className="exchange">
            <h1 className="exchange__title">Биржа</h1>
            <div className="exchange__body">
                <SecuritiesList securities={securities}></SecuritiesList>
            </div>
        </div>
        </ExchangeContext.Provider>
    )
}