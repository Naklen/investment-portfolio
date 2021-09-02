import React, { useState } from 'react'
import CrossIcon from '../../icons/CrossIcon'
import classes from './Select.module.css'

export default function Select({ options, selectName, value, onChange, cleanable = false }) {
    const [select, setSelect] = useState(options.find(option => option.value === value)?.name)
    const clickOption = (id) => {
        const newSelectedOption = options.find(option => option.value === id)
        setSelect(newSelectedOption?.name)
        onChange(id)
    }
    const rootClasses = [classes.select]
    if (select)
        rootClasses.push(classes['option-selected'])

    return (
        <div tabIndex="-1" className={rootClasses.join(' ')} id={selectName}>
            <div className={classes.options}>            
                {options.map(option => {
                    return (
                        <div key={option.value} className={select === option.name ? [classes.option, classes['option_selected']].join(' ') : classes.option}>
                            {option.value === value ?
                                <input type="radio" id={option.value} name={selectName}
                                    onChange={e => clickOption(e.target.id)} className={classes.radio} checked/>
                                :
                                <input type="radio" id={option.value} name={selectName}
                                    onChange={e => clickOption(e.target.id)} className={classes.radio}/>
                            }
                            <label title={option.name}htmlFor={option.value} className={classes['option__label']}>{option.name}</label>
                        </div>
                    )
                })} 
            </div>
            {(cleanable && value) && (
                <label className={classes['clear-button__label']}
                    onClick={(e) => { e.stopPropagation(); setSelect(''); onChange(''); }}><CrossIcon className={classes.cross}/></label>
            )}
            <label className={classes.name} htmlFor={selectName}>{selectName}</label>
            {select && <label title={select} className={classes['displayed-option']} htmlFor={selectName}>{select}</label>}
        </div>
    )
}
