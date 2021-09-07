import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { eel } from '../App'
import { Context } from '../context'
import Button from './UI/button/Button'
import Input from './UI/input/Input'
import Modal from './UI/modal/Modal'

export default function ClearDBModal({ visible, setVisible }) {
    const { setUser } = useContext(Context)
    const [password, setPassword] = useState('')
    const [passDanger, setPassDanger] = useState(false)
    const router = useHistory()
    
    const clearDatabase = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        const isCleared = await eel.try_clear_database(password)()
        console.log(isCleared)
        if (isCleared.hasOwnProperty('done')) {
            setUser({})
            router.push('/exchange')
            setVisible(false)
        }            
        if (isCleared.hasOwnProperty('error')) {
            if (isCleared.error === 'wrong password')
                setPassDanger(true)            
        }        
    }

    const passPlacehoder = passDanger ? "Неверный пароль" : "Пароль"

    useEffect(() => {
        if (!visible) {
            setPassword('')
            setPassDanger(false)
        }        
    }, [visible])
    
    return (
       <Modal visible={visible} setVisible={setVisible}>            
            <form >
                <h2>Очистка базы данных</h2>
                <br />
                Это действие приведет к удалению всех записей <br /> из базы данных и созданию двух профилей: <br /> User без пароля и Admin с паролем admin
                <br />
                <Input isDangerous={passDanger}
                    autocomplete="off"
                    id="clearDBPass"
                    placeholder={passPlacehoder}
                    type="password" value={password}
                    onChange={e => { setPassDanger(false); setPassword(e.target.value) }}>
                </Input>
                <Button isDangerous={true} onClick={e => clearDatabase(e)}>Очистить базу данных</Button>
            </form>
        </Modal>
    )
}
