import React, { useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import MoneyIcon from './icons/MoneyIcon'
import SuitcaseIcon from './icons/SuitcaseIcon'
import UserIcon from './icons/UserIcon'
import NavmenuItem from './NavmenuItem'
import { Context } from '../context'
import Button from './UI/button/Button'

export default function Navmenu({setLoginModalVisible, setNewUserModalVisible}) {
    const {user, setUser} = useContext(Context)    
    const location = useLocation()
    const router = useHistory()
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
              <br />
              <Button isDangerous={true} onClick={() => { router.push('/exchange'); setUser({}); }}>Выйти</Button>
            </header>
        }
          <NavmenuItem toLocation="/Portfolio" currentLocation={location.pathname} Icon={SuitcaseIcon}>Портфель</NavmenuItem>
          <NavmenuItem toLocation="/Exchange" currentLocation={location.pathname} Icon={MoneyIcon}>Биржа</NavmenuItem>
          {
            Object.keys(user).length !== 0 &&
              <NavmenuItem toLocation="/Profile" currentLocation={location.pathname} Icon={UserIcon}>Профиль</NavmenuItem>
          }
        </nav>
    )
}
