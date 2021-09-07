import React, { useContext, useEffect, useState } from 'react'
import { eel } from '../../App'
import { Context } from '../../context'
import ChevronIcon from '../icons/ChevronIcon'
import TransactionsListItem from './TransactionsListItem'
import DeleteIcon from '../icons/DeleteIcon'

export default function TransactionsList() {
    const {user} = useContext(Context)
    const [transactions, setTransactions] = useState([])
    const [isCollapsed, setIsCollapsed] = useState(false)

    useEffect(() => {
        eel.get_user_transactions_history(user.id)().then(res => setTransactions(res))        
    }, [user])

    const deleteTransaction = (transactionId) => {
        eel.delete_transaction(transactionId)().then(res => {
            eel.get_user_transactions_history(user.id)().then(res => setTransactions(res))
        })
    }

    const clearHistory = (e) => {
        e.stopPropagation()
        eel.delete_all_transactions(user.id)().then(res => {
            eel.get_user_transactions_history(user.id)().then(res => setTransactions(res))
        })
    }

    const rootClasses = ['transactions-list']
    if (isCollapsed)
        rootClasses.push('transactions-list_collapsed')
    
    return (
        transactions.length !== 0 ?
            <div className={rootClasses.join(' ')}>
                <div title={ isCollapsed ? 'Развернуть' : 'Свернуть'} className="transactions-list__header" onClick={() => setIsCollapsed(!isCollapsed)}>
                    <h3>История транзакций</h3>
                    {
                        transactions.length !== 0 &&
                            <span title="Очистить историю" className="transactions-list__delete" onClick={(e) => clearHistory(e)}>
                                <DeleteIcon className="transactions-list__delete-icon"></DeleteIcon>
                            </span>
                    }
                    <span className="transactions-list__chevron"><ChevronIcon className="transactions-list__chevron-icon"></ChevronIcon></span>                
                </div>
                <div className="transactions-list__content">
                    {
                        transactions.map(t => <TransactionsListItem transaction={t} key={t.id} onDelete={deleteTransaction}></TransactionsListItem>)
                    }
                </div>
            </div>
            :
            <h3 className="transactions-list__header_empty">История транзакций пуста</h3>
    )
}
