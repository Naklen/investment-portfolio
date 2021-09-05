import React from 'react'
import classes from './Button.module.css'

export default function Button({ children, isDangerous = false, ...props }) {
    const buttonClasses = [classes.button]
    if (isDangerous)
        buttonClasses.push(classes.dangerous)
    return (
        <button className={buttonClasses.join(' ')}{...props}>{children}</button>
    )
}
