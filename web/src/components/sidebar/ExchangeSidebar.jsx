import React, { useContext } from 'react'
import Select from '../UI/select/Select'
import { markets, boards } from '../../utils/moexMarketsAndBoards'
import { Context } from '../../context'
import Switch from '../UI/switch/Switch'
import Input from '../UI/input/Input'

export default function ExchangeSidebar() {
    const {exchangeState, setExchangeState} = useContext(Context)
    return (
        <aside className="sidebar">
            <h3>Сортировка и поиск</h3>
            <div className="sort-block">
            <Select
                selectName="Сортировка"
                value={exchangeState.sort.option}
                onChange={option => setExchangeState(prevExchangeState => ({...prevExchangeState, sort: {option, isDescending: exchangeState.sort.isDescending}}))}
                options={[{ name: 'Тикер', value: 'SECID' }, { name: 'Название', value: 'SHORTNAME' },
                    { name: 'Цена последней сделки', value: 'LAST' }, { name: 'Изменение цены', value: 'CHANGE' }]}
                cleanable
            />
            <Switch checked={exchangeState.sort.isDescending} onChange={() => setExchangeState(
                {...exchangeState, sort: { option: exchangeState.sort.option, isDescending: !exchangeState.sort.isDescending}})}></Switch>
            </div>
            <Input autocomplete="off" id="search" placeholder="Поиск" type="text" value={exchangeState.searchQuery}
                onChange={e => setExchangeState({ ...exchangeState, searchQuery: e.target.value })}>                
            </Input>            
            <h3>Выбор ценных бумаг</h3>
            <Select
                selectName="Рынки"
                value={exchangeState.market}
                onChange={market => setExchangeState(prevExchangeState => ({...prevExchangeState, market, board: boards[market][0].value}))}
                options={markets}
            />
            <Select
                selectName="Режим торгов"
                value={exchangeState.board}
                onChange={board => setExchangeState(prevExchangeState => ({...prevExchangeState, board}))}
                options={boards[exchangeState.market]}
            />
        </aside>
    )
}
