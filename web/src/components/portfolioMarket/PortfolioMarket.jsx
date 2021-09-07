import React from 'react'
import ChevronIcon from '../icons/ChevronIcon'
import SecuritiesList from '../SecuritiesList'
import classes from './PortfolioMarket.module.css'

export default function PortfolioMarket({ screenType, listType, securities, title, collapsed, setCollapsed }) {    
    const rootClasses = [classes.market]
    if (collapsed)
        rootClasses.push(classes.collapsed)
        
    return (
        <div className={rootClasses.join(' ')}>
            <br />
            <div title={ collapsed ? 'Развернуть' : 'Свернуть'} className={classes.title} onClick={() => setCollapsed(!collapsed)}>
                <h2>{title}</h2>
                <ChevronIcon className={classes.chevron}/>
            </div>
            <div className={classes['sec-list']}>
                <SecuritiesList screenType={screenType} listType={listType} securities={securities}/>
            </div>
        </div>
    )
}
