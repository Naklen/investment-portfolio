import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import MoneyIcon from './icons/MoneyIcon'
import SuitcaseIcon from './icons/SuitcaseIcon'
import NavmenuItem from './NavmenuItem'
import { Context } from '../context'

export default function Navmenu() {
    const {user} = useContext(Context)
    const location = useLocation()
    return (
        <nav className="navmenu">
          <header className='navmenu__header'>
            Пользователь: {user.name}
          </header>
          <NavmenuItem toLocation="/Portfolio" currentLocation={location.pathname} Icon={SuitcaseIcon}>Портфель</NavmenuItem>
          <NavmenuItem toLocation="/Exchange" currentLocation={location.pathname} Icon={MoneyIcon}>Биржа</NavmenuItem>
        </nav>
    )
}
