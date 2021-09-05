import React, { useContext, useState } from 'react'
import { eel } from '../App'
import { Context } from '../context'
import Button from './UI/Button/Button'
import Input from './UI/input/Input'
import Modal from './UI/modal/Modal'

export default function LoginModal({visible, setVisible}) {
    const { setUser } = useContext(Context)
    const [loginForm, setLoginForm] = useState({ name: '', password: '' })
    const logIn = async (e) => {
        e.preventDefault()
        const newUser = await eel.try_log_in_user(loginForm.name, loginForm.password)()        
        if (newUser.hasOwnProperty('name')) {
            setUser(newUser)
            setVisible(false)
        }            
        if (newUser.hasOwnProperty('error')) {
            console.log(newUser.error)
        }
    }
    
    return (
        <Modal visible={visible} setVisible={setVisible}>
            <form>
                <h2>Вход</h2>
                <Input autocomplete="off" id="loginName" placeholder="Логин" type="text" value={loginForm.value}
                    onChange={e => setLoginForm({ ...loginForm, name: e.target.value })}>                
                </Input>
                <Input autocomplete="off" id="loginPass" placeholder="Пароль" type="password" value={loginForm.password}
                    onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}>                
                </Input>
                <Button onClick={e => logIn(e)}>Войти</Button>
            </form>
        </Modal>
    )
}
