import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../context'
import { exchangeTypes, screenTypes } from '../utils/securitiesListTypes'
import SecurityPriceBlock from './SecurityPriceBlock'

export default function SecuritiesListItem({listType, screenType, ...props}) {
    const router = useHistory()
    const { exchangeState } = useContext(Context)
    const dash = '\u2014'
    const sign = listType === exchangeTypes.bonds ? '%' : '\u20BD'

    return (
        <div className="securities-list__item security" onClick={() => router.push(`/security/${exchangeState.market}/${exchangeState.board}/${props.secid}`)}>
            <div title="Тикер" className="security__secid">{props.secid}</div>
            <strong className="security__name">{props.name}</strong>
            {
                screenType === screenTypes.portfolio &&                
                <div className="user-have">
                    <div title="Количество в портфеле" className="user-have__count">{props.count} шт.</div>
                    <div title="Общая стоимость ц/б в портфеле" className="user-have__total-price">{props.price ? `${props.price*props.count} ${sign}` : dash}</div>
                </div>                
            }
            <SecurityPriceBlock listType={listType} className="securities-list-item__price-block" price={props.price}
                change={props.change} changePercent={props.changePercent} />
        </div>
    )
}
