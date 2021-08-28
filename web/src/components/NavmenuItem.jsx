import React from 'react'
import { Link } from 'react-router-dom'

export default function NavmenuItem({toLocation, currentLocation, children, Icon}) {
    return (
        <Link className={`navmenu__item${currentLocation === toLocation ? " navmenu__item_active" : ""}`} to={toLocation}>
            {Icon ? <Icon className="navmenu__item-icon"/> : null}
            {children}
        </Link>
    )
}
