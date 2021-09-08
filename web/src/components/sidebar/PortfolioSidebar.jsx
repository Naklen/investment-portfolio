import React, { useContext } from 'react'
import { Context } from '../../context'
import Input from '../UI/input/Input'
import Select from '../UI/select/Select'
import Switch from '../UI/switch/Switch'

export default function PortfolioSidebar({secCount, totalPrice}) {
    const {portfolioSortAndFilter, setPortfolioSortAndFilter} = useContext(Context)
    return (
        <aside className="sidebar">
            <h3>Сортировка и поиск</h3>
            <div className="sort-block">
                <Select
                selectName="Сортировка"
                value={portfolioSortAndFilter.sort.option}
                onChange={option => setPortfolioSortAndFilter(prevPortfolioSortAndFilter => ({...prevPortfolioSortAndFilter, sort: {option, isDescending: portfolioSortAndFilter.sort.isDescending}}))}
                    options={[{ name: 'Тикер', value: 'SECID' }, { name: 'Название', value: 'SHORTNAME' },
                    { name: 'Общая цена ц/б в портфеле', value: 'total' }, { name: 'Кол-во ц/б в портфеле', value: 'count' },
                    { name: 'Цена последней сделки', value: 'LAST' }, { name: 'Изменение цены', value: 'CHANGE' }]}
                cleanable
            />
            <Switch checked={portfolioSortAndFilter.sort.isDescending} onChange={() => setPortfolioSortAndFilter(
                {...portfolioSortAndFilter, sort: { option: portfolioSortAndFilter.sort.option, isDescending: !portfolioSortAndFilter.sort.isDescending}})}></Switch>
            </div>
            <Input autocomplete="off" id="search" placeholder="Поиск" type="text" value={portfolioSortAndFilter.searchQuery}
                onChange={e => setPortfolioSortAndFilter({ ...portfolioSortAndFilter, searchQuery: e.target.value })}>
            </Input>
            <br />
            <h4 title="Общее количество ц/б в портфеле">Ценных бумаг в портфеле:&nbsp;{secCount}</h4>
            <br />
            <h4 title="Общая стоимость ц/б в портфеле">Стоимость портфеля:&nbsp;{totalPrice}&nbsp;{'\u20BD'}</h4>
        </aside>
    )
}
