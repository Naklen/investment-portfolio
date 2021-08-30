import React from 'react'

export default function Switch(props) {
    return (
        <label>
            <input type="checkbox" {...props} />
            <span></span>
        </label>
    )
}
