import React from 'react'

export default function ParameterOfInstrument({pName, pValue}) {
    return (
        <li className="params-of-instr__parameter">
            <div className="parameter__name">{pName}</div>
            <div className="parameter__value">{pValue}</div>
        </li>
    )
}
