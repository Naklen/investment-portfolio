import React from 'react'

const changeTip = 'Изменение цены последней сделки к последней цене предыдущего дня'

export default function SecurityPriceBlock({ className, ...props }) {    
    return (
        <div className={`${className} security__price-block`}>
            <div title="Цена последней сделки" className="security__price">{props.price ? `${props.price} \u20BD` : '\u2014'}</div>
            {/* Should I extract this to another component? */}
            {
                (props.change > 0) &&
                <div title={changeTip} className="security__change-block">
                    <div className="security__change security__change_positive">{props.change ? `+${props.change} \u20BD` : '\u2014'}</div>                    
                    <div className="security__change-percent security__change-percent_positive">{props.changePercent ? `+${props.changePercent} %` : '\u2014'}</div>
                </div>
            }
            {
                (props.change < 0) && 
                <div title={changeTip} className="security__change-block">
                    <div className="security__change security__change_negative">{props.change ? `${props.change} \u20BD` : '\u2014'}</div>                    
                    <div className="security__change-percent security__change-percent_negative">{props.changePercent ? `${props.changePercent} %` : '\u2014'}</div>
                </div>                    
            }
            {
                (props.change === 0) && 
                <div title={changeTip} className="security__change-block">
                    <div className="security__change">{props.change ? `${props.change} \u20BD` : '\u2014'}</div>                    
                    <div className="security__change-percent">{props.changePercent ? `${props.changePercent} %` : '\u2014'}</div>
                </div>                    
            }                
        </div>
    )
}
