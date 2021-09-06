import React, { useContext, useEffect, useState } from 'react'
import { eel } from '../App'
import { Context } from '../context'
import Button from './UI/button/Button'
import Input from './UI/input/Input'
import Modal from './UI/modal/Modal'

export default function NewUserModal({visible, setVisible}) {
    const { setUser } = useContext(Context)
    const [newUserForm, setNewUserForm] = useState({ name: '', password: '', confirm: '' })
    const [nameDanger, setNameDanger] = useState(false)
    const [confDanger, setConfDanger] = useState(false)
    const createUser = async (e) => {
        e.preventDefault()
        if (newUserForm.name === null || newUserForm.name === '') {
            setNameDanger(true)
            return
        }
        if (newUserForm.password !== '' && newUserForm.password !== newUserForm.confirm) {
            setConfDanger(true)
            return
        }        
        const newUser = await eel.try_create_user(newUserForm.name, newUserForm.password)()        
        if (newUser.hasOwnProperty('name')) {
            setUser(newUser)
            setVisible(false)
        }            
        if (newUser.hasOwnProperty('error')) {
            console.log(newUser.error)
            if (newUser.error === 'user already exist')
                setNameDanger(true)                
        }        
    }

    useEffect(() => {
        if (!visible) {
            setNewUserForm({ name: '', password: '', confirm: '' })
            setNameDanger(false)
            setConfDanger(false)
        }
    }, [visible])
    
    let namePlacehoder
    if (nameDanger) {
        if (newUserForm.name === null || newUserForm.name === '')
            namePlacehoder = 'Введите имя'
        else
            namePlacehoder = 'Профиль существует'
    }
    else
        namePlacehoder = 'Логин'
    const confPlacehoder = confDanger ? "Пароли не совпадают" : "Подтверждение пароля"

    return (
        <Modal visible={visible} setVisible={setVisible}>
            <form>
                <h2>Новый профиль</h2>
                <Input isDangerous={nameDanger} autocomplete="off" id="newUserName" placeholder={namePlacehoder} type="text" value={newUserForm.name}
                    onChange={e => { setNameDanger(false); setNewUserForm({ ...newUserForm, name: e.target.value }) }}>
                </Input>
                <Input autocomplete="off" id="newUserPass" placeholder="Пароль" type="password" value={newUserForm.password}
                    onChange={e => setNewUserForm({ ...newUserForm, password: e.target.value })}>                
                </Input>
                <Input isDangerous={confDanger} autocomplete="off" id="newUserConfirm" placeholder={confPlacehoder} type="password" value={newUserForm.confirm}
                    onChange={e => { setConfDanger(false); setNewUserForm({ ...newUserForm, confirm: e.target.value }) }}>
                </Input>
                <Button onClick={e => createUser(e)}>Создать</Button>
            </form>
        </Modal>
    )
}
