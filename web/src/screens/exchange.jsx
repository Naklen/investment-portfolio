import React, {useState} from 'react'
import { eel } from '../App'
import ReactJson from 'react-json-view'

export default function Exchange() {
    const [state, setstate] = useState('{}')

    async function insertJSON() {        
        let newState = await eel.get_json()()
        console.log(newState)
        setstate(newState)
    }

    return (
        <div>
            <h1>Биржа</h1>
            <button onClick={insertJSON}>Жми</button>
            <ReactJson src={JSON.parse(state)}></ReactJson>
            <p>{ JSON.parse(state).SHORTNAME.AFLT }</p>
        </div>
    )
}
