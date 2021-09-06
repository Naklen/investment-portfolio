import React, { useContext, useEffect, useState } from 'react'
import { eel } from '../App'
import { Context } from '../context'
import Button from './UI/button/Button'
import Input from './UI/input/Input'
import Modal from './UI/modal/Modal'

export default function LoginModal({visible, setVisible}) {
    const { setUser } = useContext(Context)
    const [loginForm, setLoginForm] = useState({ name: '', password: '' })
    const [nameDanger, setNameDanger] = useState(false)
    const [passDanger, setPassDanger] = useState(false)
    const logIn = async (e) => {
        e.preventDefault()
        const newUser = await eel.try_log_in_user(loginForm.name, loginForm.password)()        
        if (newUser.hasOwnProperty('name')) {
            setUser(newUser)            
            setVisible(false)
        }            
        if (newUser.hasOwnProperty('error')) {
            if (newUser.error === 'user does not exist')
                setNameDanger(true)
            if (newUser.error === 'password dont match')
                setPassDanger(true)
        }
    }

    useEffect(() => {
        if (!visible)
            setLoginForm({ name: '', password: '' })
            setNameDanger(false)
            setPassDanger(false)
    }, [visible])

    const namePlacehoder = nameDanger ? "Профиль не найден" : "Логин"
    const passPlacehoder = passDanger ? "Неверный пароль" : "Пароль"
    
    return (
        <Modal visible={visible} setVisible={setVisible}>
            <form>
                <h2>Вход</h2>                
                <Input isDangerous={nameDanger} autocomplete="off" id="loginName" placeholder={namePlacehoder} type="text" value={loginForm.name}
                    onChange={e => { setNameDanger(false); setLoginForm({ ...loginForm, name: e.target.value }) }}>
                </Input>                        
                <Input isDangerous={passDanger} autocomplete="off" id="loginPass" placeholder={passPlacehoder} type="password" value={loginForm.password}
                    onChange={e => { setPassDanger(false); setLoginForm({ ...loginForm, password: e.target.value }) }}>
                </Input>
                <Button onClick={e => logIn(e)}>Войти</Button>
            </form>
        </Modal>
    )
}
