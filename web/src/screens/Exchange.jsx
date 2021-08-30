import React, {useState, useEffect, useContext, useMemo} from 'react'
import { eel } from '../App'
import SecuritiesList from '../components/SecuritiesList'
import ExchangeSidebar from '../components/sidebar/ExchangeSidebar'
import { ExchangeContext } from '../context'


export default function Exchange() {
    const [securities, setSecurities] = useState([])
    const { exchangeState } = useContext(ExchangeContext)    

    useEffect(() => {
        setSpecifiedSecurities(exchangeState.market, exchangeState.board)
        const id = setInterval(() => {            
            setSpecifiedSecurities(exchangeState.market, exchangeState.board)
        }, 60*1000)
        return () => {
            clearInterval(id)
        }
    }, [exchangeState.market, exchangeState.board])

    const sortedSecurities = useMemo(() => {        
        if (exchangeState.sort.option)
            return [...securities].sort((a, b) => {
                const descendingCoeff = exchangeState.sort.isDescending ? -1 : 1
                if (a[exchangeState.sort.option]) {
                    if (!b[exchangeState.sort.option])
                        return -1 //if b is null then a must be placed before it 
                    if ((typeof a[exchangeState.sort.option]) === 'number') {
                        return (a[exchangeState.sort.option] - b[exchangeState.sort.option]) * descendingCoeff
                    }
                    return a[exchangeState.sort.option].localeCompare(b[exchangeState.sort.option]) * descendingCoeff
                }
                return 1 //if a is null then it must be placed after b
            })
        return securities
    }, [exchangeState, securities])

    async function setSpecifiedSecurities(market, board) {
        console.log('get')
        setSecurities(await eel.get_securities_list(market, board)())
    }

    return (        
        <div className="exchange">
            <h1 className="exchange__title header">Биржа</h1>
            <div className="exchange__body">
                <SecuritiesList securities={sortedSecurities}></SecuritiesList>
                <ExchangeSidebar />
            </div>                
        </div>        
    )
}
