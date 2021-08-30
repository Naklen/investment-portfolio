import React, { useContext } from 'react'
import Select from '../UI/select/Select'
import { markets, boards } from '../../utils/moexMarketsAndBoards'
import { ExchangeContext } from '../../context'
import Switch from '../UI/switch/Switch'

export default function ExchangeSidebar() {
    const {exchangeState, updateExchangeState} = useContext(ExchangeContext)
    return (
        <aside className="exchange-sidebar">
            <Select
                defaultValue="Сортировка"
                value={exchangeState.sort.option}
                onChange={option => updateExchangeState([                    
                    { name: 'sort', value: { option, isDescending: exchangeState.sort.isDescending } }
                ])}
                options={[{ name: 'Тикер', value: 'SECID' }, { name: 'Название', value: 'SHORTNAME' },
                        { name: 'Цена последней сделки', value: 'LAST' }, { name: 'Изменение цены', value: 'CHANGE' }]}
            />
            <Switch checked={exchangeState.sort.isDescending} onChange={() => updateExchangeState([                    
                    { name: 'sort', value: { option: exchangeState.sort.option, isDescending: !exchangeState.sort.isDescending } }
                ])}></Switch>
            <Select
                defaultValue="Рынки"
                value={exchangeState.market}
                onChange={market => updateExchangeState([
                    { name: 'market', value: market },
                    { name: 'board', value:boards[market][0].value}                    
                ])}
                options={markets}
            />
            <Select
                defaultValue="Режим торгов"
                value={exchangeState.board}
                onChange={board => updateExchangeState([{name:'board', value: board}])}
                options={boards[exchangeState.market]}
            />
        </aside>
    )
}
