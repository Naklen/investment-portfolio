import React, {useState} from 'react'
import { eel } from '../App'

export default function Portfolio() {
    const [state, setstate] = useState('')

    async function insertJSON() {        
        let newState = await eel.get_json()()
        console.log(newState)
        setstate(newState)
    }
    return (
        <div>
            <h1>Портфель</h1>
            <button onClick={insertJSON}>Жми</button>
            <p>{state}</p>
        </div>
    )
}
