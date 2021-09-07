import React from 'react'
import SecurityPriceBlock from './SecurityPriceBlock'
import { nf } from '../utils/numberFormat.js'

export default function SecurityTradeInfo({ security, market = ''}) {  
    const tips = {
        offer: "Лучшая котировка на продажу",
        bid: "Лучшая котировка на покупку",
        max: "Максимальная цена сделки",
        min: "Минимальная цена сделки",
        count: "Количество сделок за торговый день",
        volume: "Объем совершенных сделок, выраженный в единицах ценных бумаг",
        cap: "Текущая капитализация акции"
    }
    const dash = '\u2014'
    return (
        <div className="security-screen__trade-info">
            <SecurityPriceBlock className="security-screen__price-block" price={security.LAST}
                change={security.CHANGE} changePercent={security.LASTTOPREVPRICE} market={market}/>
            <div className="trade-info__info-unit offer-bid-unit">
                <div className="offer-bid-unit__offer" title={tips.offer}><span>Предложение:</span> { security.OFFER ? nf(security.OFFER) : dash}</div>
                <div className="offer-bid-unit__bid" title={tips.bid}><span>Спрос:</span> { security.BID ? nf(security.BID) : dash}</div>
            </div>
            <div className="trade-info__info-unit max-min-unit">
                <div className="max-min-unit__max" title={tips.max}><span>Максимум:</span> { security.HIGH ? nf(security.HIGH) : dash}</div>
                <div className="max-min-unit__min" title={tips.min}><span>Минимум:</span> { security.LOW ? nf(security.LOW) : dash}</div>
            </div>
            <div className="trade-info__info-unit counts-unit">
                <div className="counts-unit__trades-count" title={tips.count}><span>Сделок сегодня:</span> { security.NUMTRADES ? nf(security.NUMTRADES) : dash}</div>
                <div className="counts-unit__volume" title={tips.volume}><span>Количество сегодня:</span> { security.VOLTODAY ? nf(security.VOLTODAY) : dash}</div>
            </div>
            <div className="trade-info__info-unit capitalization-unit" title={tips.cap}><span>Капитализация:</span>
                {security.ISSUECAPITALIZATION ? nf(security.ISSUECAPITALIZATION) : dash}</div>
        </div>
    )
}
