import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ExchangeContext } from '../context'
import SecurityPriceBlock from './SecurityPriceBlock'

export default function SecuritiesListItem(props) {
    const router = useHistory()
    const {exchangeState} = useContext(ExchangeContext)

    return (
        <div className="securities-list__item security" onClick={() => router.push(`/security/${exchangeState.market}/${exchangeState.board}/${props.secid}`)}>
            <div title="Тикер" className="security__secid">{props.secid}</div>
            <strong className="security__name">{props.name}</strong>
            <SecurityPriceBlock price={props.price} change={props.change} changePercent={props.changePercent}/>
        </div>
    )
}
