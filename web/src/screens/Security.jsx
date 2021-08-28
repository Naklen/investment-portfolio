import React from 'react'
import { useParams } from 'react-router-dom'

export default function Security() {
    const { market, board, secid } = useParams()
    //console.log(params)
    return (
        <div>
            <h1>{ market } {board} { secid }</h1>
        </div>
    )
}
