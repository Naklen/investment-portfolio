import React from 'react'
import classes from './Input.module.css'

export default function Input({ id, isDangerous=false, ...props }) {
    const inputClasses = [classes.input__field]
    if (isDangerous)
        inputClasses.push(classes.dangerous)
    return (
        <div className={classes.input}>
            <input className={inputClasses.join(' ')} id={id} {...props} />
            <label className={classes.input__label} htmlFor={id}>{props.placeholder}</label>
        </div>
    )
}
