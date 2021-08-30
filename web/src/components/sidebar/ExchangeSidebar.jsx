import React, { useContext } from 'react'
import Select from '../UI/select/Select'
import { markets, boards } from '../../utils/moexMarketsAndBoards'
import { ExchangeContext } from '../../context'

export default function ExchangeSidebar() {
    const {exchangeState, setExchangeState} = useContext(ExchangeContext)
    return (
        <aside className="exchange-sidebar">
            <Select
                defaultValue="Рынки"
                value={exchangeState.market}
                onChange={market => setExchangeState({ market: market, board: boards[market][0].value })}
                options={markets}
            />
            <Select
                defaultValue="Режим торгов"
                value={exchangeState.board}
                onChange={board => setExchangeState({ market: exchangeState.market, board: board })}
                options={boards[exchangeState.market]}
            />
        </aside>
    )
}
