import React, { useContext, useEffect, useState } from 'react'
import { eel } from '../App'
import { Context } from '../context'
import Input from './UI/input/Input'
import MinusIcon from './icons/MinusIcon'
import PlusIcon from './icons/PlusIcon'
import { nf } from '../utils/numberFormat'

export default function UserSecurityCount({ market, board, secid, price }) {
    const { user } = useContext(Context)
    const [count, setCount] = useState(0)
    const [changeCount, setChangeCount] = useState('')
    const [danger, setDanger] = useState(false)
    const [placeholder, setPlaceholder] = useState('Добавить/Удалить')
    useEffect(() => {
        console.log('usc')
        eel.get_user_security_count(user.id, secid)().then(c => setCount(c))
    }, [user, secid])
    const addSecurity = () => {        
        if (changeCount !== '') {
            eel.add_or_delete_security_to_user(user.id, {
                secid: secid,
                market: market,
                board: board,
                count: changeCount,
                price: price
            }, true, new Date(Date.now()).toISOString())().then(() => { setCount(count + changeCount); setChangeCount('') })
            price ? setPlaceholder(`Добавлено: ${changeCount}`) : setPlaceholder(`Добавлено без цены: ${changeCount}`)
        }                
    }
    const removeSecurity = () => {
        if (changeCount <= count) {
            if (changeCount !== '') {
                eel.add_or_delete_security_to_user(user.id, {
                    secid: secid,
                    market: market,
                    board: board,
                    count: changeCount,
                    price: price
                }, false, new Date(Date.now()).toISOString())().then(() => { setCount(count - changeCount); setChangeCount('') })
                setPlaceholder(`Убрано: ${changeCount}`)
            }
        }
        else {
            setDanger(true)
            setPlaceholder('Нет столько ц/б')
        }
    }
    return (
        <div className="user-security-count">
            Ценных бумаг в портфеле:&nbsp;<span>{nf(count)}</span>
            <div className="user-security__add-count">
                <div title="Убрать" className="user-security-count__minus-button" onClick={() => removeSecurity()}><MinusIcon></MinusIcon></div>
                <Input isDangerous={danger} autocomplete="off" id="search" placeholder={placeholder} type="number" value={changeCount}
                    onChange={e => {
                        setPlaceholder('Добавить/Удалить')
                        if (danger) {
                            setDanger(false)                            
                        }
                        if (e.target.value === '' || parseInt(e.target.value) > 0)
                            if(e.target.value !== '')
                                setChangeCount(parseInt(e.target.value))
                            else
                                setChangeCount('')
                    }}>
                </Input>
                <div title="Добавить" className="user-security-count__plus-button" onClick={() => addSecurity()}><PlusIcon></PlusIcon></div>
            </div>
        </div>
    )
}
