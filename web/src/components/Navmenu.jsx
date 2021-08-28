import React from 'react'
import { useLocation } from 'react-router-dom'
import MoneyIcon from './icons/MoneyIcon'
import SuitcaseIcon from './icons/SuitcaseIcon'
import NavmenuItem from './NavmenuItem'

export default function Navmenu() {    
    const location = useLocation()
    return (
        <div className="navmenu">
          <NavmenuItem toLocation="/Portfolio" currentLocation={location.pathname} Icon={SuitcaseIcon}>Портфель</NavmenuItem>
          <NavmenuItem toLocation="/Exchange" currentLocation={location.pathname} Icon={MoneyIcon}>Биржа</NavmenuItem>
        </div>
    )
}
