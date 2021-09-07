import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { Context } from '../context'
import { exchangeTypes, screenTypes } from '../utils/securitiesListTypes'
import SecurityPriceBlock from './SecurityPriceBlock'

export default function SecuritiesListItem({listType, screenType, ...props}) {
    const router = useHistory()
    const { exchangeState } = useContext(Context)
    const dash = '\u2014'    
    const total = listType === exchangeTypes.bonds ? (((props.price / 100)*1000)*props.count).toFixed(2) : (props.price * props.count).toFixed(2)
    const route = screenType === screenTypes.exchange ? 
        `/security/${exchangeState.market}/${exchangeState.board}/${props.secid}`
        :
        `/security/${props.market}/${props.board}/${props.secid}`

    return (
        <div title="На страницу ц/б" className="securities-list__item security" onClick={() => router.push(route)}>
            <div title="Тикер" className="security__secid">{props.secid}</div>
            <strong className="security__name">{props.name}</strong>
            {
                screenType === screenTypes.portfolio &&                
                <div className="user-have">
                    <div title="Количество в портфеле" className="user-have__count">{props.count} шт.</div>
                    <div title="Общая стоимость ц/б в портфеле" className="user-have__total-price">
                        {props.price ? `${total} \u20BD` : dash}
                    </div>
                </div>                
            }
            <SecurityPriceBlock listType={listType} className="securities-list-item__price-block" price={props.price}
                change={props.change} changePercent={props.changePercent} />
        </div>
    )
}
