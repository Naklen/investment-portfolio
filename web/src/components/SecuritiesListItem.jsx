import React from 'react'
import SecurityPriceBlock from './SecurityPriceBlock'

export default function SecuritiesListItem(props) {
    return (
        <div className="securities-list__item security">
            <div title="Тикер" className="security__secid">{props.secid}</div>
            <strong className="security__name">{props.name}</strong>
            <SecurityPriceBlock price={props.price} change={props.change} changePercent={props.changePercent}/>
        </div>
    )
}
