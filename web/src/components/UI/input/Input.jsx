import React from 'react'
import classes from './Input.module.css'

export default function Input({id, ...props}) {
    return (
        <div className={classes.input}>
            <input className={classes.input__field} id={id} {...props} />
            <label className={classes.input__label} htmlFor={id}>{props.placeholder}</label>
        </div>
    )
}
