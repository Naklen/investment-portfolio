import React from 'react'
import classes from './Switch.module.css'
import ArrowIcon from '../../icons/ArrowIcon'

export default function Switch({ checked, ...props }) {    
    return (
        <label className={classes.label}>
            <input type="checkbox" className={classes['visually-hidden']} checked {...props}/>
            <ArrowIcon className={checked ? [classes.arrow, classes.descending].join(' ') : classes.arrow}/>
        </label>
    )
}
