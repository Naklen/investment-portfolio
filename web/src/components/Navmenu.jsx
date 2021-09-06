import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import MoneyIcon from './icons/MoneyIcon'
import SuitcaseIcon from './icons/SuitcaseIcon'
import NavmenuItem from './NavmenuItem'
import { Context } from '../context'
import Button from './UI/Button/Button'

export default function Navmenu({setLoginModalVisible, setNewUserModalVisible}) {
    const {user, setUser} = useContext(Context)    
    const location = useLocation()
    console.log('nav')
    return (
        <nav className="navmenu">
        {
          Object.keys(user).length === 0
            ?
            <header className='navmenu__header_logged-out'>
              <Button onClick={() => setLoginModalVisible(true)}>Войти</Button>
              <Button onClick={() => setNewUserModalVisible(true)}>Новый&nbsp;профиль</Button>
            </header>
            :
            <header className='navmenu__header'>
              Пользователь: <span title='Нажмите, чтобы сменить пользователя' onClick={() => setLoginModalVisible(true)}>{user.name}</span>
              <Button isDangerous={true} onClick={e => setUser({})}>Выйти</Button>
            </header>
        }
          <NavmenuItem toLocation="/Portfolio" currentLocation={location.pathname} Icon={SuitcaseIcon}>Портфель</NavmenuItem>
          <NavmenuItem toLocation="/Exchange" currentLocation={location.pathname} Icon={MoneyIcon}>Биржа</NavmenuItem>
        </nav>
    )
}
