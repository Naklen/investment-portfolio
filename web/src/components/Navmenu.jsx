import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import MoneyIcon from './icons/MoneyIcon'
import SuitcaseIcon from './icons/SuitcaseIcon'
import NavmenuItem from './NavmenuItem'
import { Context } from '../context'

export default function Navmenu({setLoginModalVisible}) {
    const {user} = useContext(Context)
    
    const location = useLocation()
    console.log('nav')
    return (
        <nav className="navmenu">
        {
          Object.keys(user).length === 0
            ?
            <header className='navmenu__header'>
            <button onClick={() => setLoginModalVisible(true)}>Войти</button>
            </header>
            :
            <header className='navmenu__header'>
            Пользователь: <span title='Нажмите, чтобы сменить пользователя' onClick={() => setLoginModalVisible(true)}>{user.name}</span>
            </header>
        }
          <NavmenuItem toLocation="/Portfolio" currentLocation={location.pathname} Icon={SuitcaseIcon}>Портфель</NavmenuItem>
          <NavmenuItem toLocation="/Exchange" currentLocation={location.pathname} Icon={MoneyIcon}>Биржа</NavmenuItem>
        </nav>
    )
}
