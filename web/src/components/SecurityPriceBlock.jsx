import React from 'react'
import { exchangeTypes } from '../utils/securitiesListTypes'

const changeTip = 'Изменение цены последней сделки к последней цене предыдущего дня'

export default function SecurityPriceBlock({ listType, className, ...props }) {
    const dash = '\u2014'
    const sign = listType === exchangeTypes.bonds ? '%' : '\u20BD'
    return (
        <div className={`${className} security__price-block`}>
            <div title="Цена последней сделки" className="security__price">{props.price ? `${props.price} ${sign}` : dash}</div>
            {/* Should I extract this to another component? */}
            {
                (props.change > 0) &&
                <div title={changeTip} className="security__change-block">
                    <div className="security__change security__change_positive">{props.change ? `+${props.change} ${sign}` : dash}</div>                    
                    <div className="security__change-percent security__change-percent_positive">{props.changePercent ? `+${props.changePercent} %` : dash}</div>
                </div>
            }
            {
                (props.change < 0) && 
                <div title={changeTip} className="security__change-block">
                    <div className="security__change security__change_negative">{props.change ? `${props.change} ${sign}` : dash}</div>                    
                    <div className="security__change-percent security__change-percent_negative">{props.changePercent ? `${props.changePercent} %` : dash}</div>
                </div>                    
            }
            {
                (props.change === 0) && 
                <div title={changeTip} className="security__change-block">
                    <div className="security__change">{props.change ? `${props.change} ${sign}` : dash}</div>
                    <div className="security__change-percent">{props.changePercent ? `${props.changePercent} %` : dash}</div>
                </div>                    
            }                
        </div>
    )
}
