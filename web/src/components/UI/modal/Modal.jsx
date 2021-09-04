import React from 'react'
import classes from './Modal.module.css'

export default function Modal({ children, visible, setVisible }) {
    const rootClasses = [classes.modal]
    if (visible)
        rootClasses.push(classes.active)
    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={classes.content} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
