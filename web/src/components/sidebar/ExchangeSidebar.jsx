import React, { useContext } from 'react'
import Select from '../UI/select/Select'
import { markets, boards } from '../../utils/moexMarketsAndBoards'
import { ExchangeContext } from '../../context'
import Switch from '../UI/switch/Switch'
import Input from '../UI/input/Input'

export default function ExchangeSidebar() {
    const {exchangeState, setExchangeState} = useContext(ExchangeContext)
    return (
        <aside className="exchange-sidebar">
            <Select
                defaultValue="Сортировка"
                value={exchangeState.sort.option}
                onChange={option => setExchangeState({...exchangeState, sort: {option, isDescending: exchangeState.sort.isDescending}})}
                options={[{ name: 'Тикер', value: 'SECID' }, { name: 'Название', value: 'SHORTNAME' },
                        { name: 'Цена последней сделки', value: 'LAST' }, { name: 'Изменение цены', value: 'CHANGE' }]}
            />
            <Switch checked={exchangeState.sort.isDescending} onChange={() => setExchangeState(
                {...exchangeState, sort: { option: exchangeState.sort.option, isDescending: !exchangeState.sort.isDescending}})}></Switch>
            <Input type="text" value={exchangeState.searchQuery} onChange={e => setExchangeState({...exchangeState ,searchQuery: e.target.value})}></Input>
            <Select
                defaultValue="Рынки"
                value={exchangeState.market}
                onChange={market => setExchangeState({...exchangeState, market, board: boards[market][0].value})}
                options={markets}
            />
            <Select
                defaultValue="Режим торгов"
                value={exchangeState.board}
                onChange={board => setExchangeState({...exchangeState, board})}
                options={boards[exchangeState.market]}
            />
        </aside>
    )
}
