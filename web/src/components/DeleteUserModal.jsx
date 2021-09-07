import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import { eel } from '../App'
import { Context } from '../context'
import Button from './UI/button/Button'
import Input from './UI/input/Input'
import Modal from './UI/modal/Modal'

export default function DeleteUserModal({ visible, setVisible }) {
    const { user, setUser } = useContext(Context)
    const [password, setPassword] = useState('')
    const [passDanger, setPassDanger] = useState(false)
    const router = useHistory()
    
    const deleteUser = async (e) => {
        e.stopPropagation()
        e.preventDefault()
        const isDeleted = await eel.try_delete_user(user.id, password)()
        console.log(isDeleted)
        if (isDeleted.hasOwnProperty('done')) {
            setUser({})
            router.push('/exchange')
            setVisible(false)
        }            
        if (isDeleted.hasOwnProperty('error')) {
            if (isDeleted.error === 'wrong password')
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
                <h2>Удаление профиля</h2>
                <Input isDangerous={passDanger}
                    autocomplete="off"
                    id="deletePass"
                    placeholder={passPlacehoder}
                    type="password" value={password}
                    onChange={e => { setPassDanger(false); setPassword(e.target.value) }}>
                </Input>
                <Button isDangerous={true} onClick={e => deleteUser(e)}>Удалить профиль</Button>
            </form>
        </Modal>
    )
}
