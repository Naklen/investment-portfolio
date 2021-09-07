import React from 'react'
import { useHistory } from 'react-router'
import classes from './TransactionsListItem.module.css'
import DeleteIcon from '../icons/DeleteIcon'

export default function TransactionsListItem({ transaction, onDelete }) {
    const buyOrSaleString = transaction['is_buy'] ? 'Покупка' : 'Продажа'
    const date = new Date(transaction.datetime)
    const buyOrSaleClass = transaction['is_buy'] ? classes.buy : classes.sale
    const router = useHistory()
    const route = `/security/${transaction.security.market}/${transaction.security.board}/${transaction.security.secid}`
    return (
        <div className={classes.transaction}>
            <div className={buyOrSaleClass}>
                {buyOrSaleString}
            </div>
            <div className={classes.datetime}>
                {date.getDate()}.{date.getMonth()}.{date.getFullYear()}&nbsp;|&nbsp;{date.getHours()}:{date.getMinutes()}
            </div>
            <div title="На страницу ц/б" className={classes.secid} onClick={() => router.push(route)}>
                {transaction.security.secid.toUpperCase()}
            </div>
            <div className={classes['count-price']}>
                {transaction['security_count']}&nbsp;<span>шт.</span>&nbsp;
                по&nbsp;
                {transaction.security.market === 'bonds' ? ((transaction.price / 100)*1000).toFixed(2) : transaction.price}{'\u20BD'}
            </div>
            <span title="Удалить из истории" className={classes.delete} onClick={() => onDelete(transaction.id)}>
                <DeleteIcon className={classes.icon}></DeleteIcon>
            </span>
        </div>
    )
}
