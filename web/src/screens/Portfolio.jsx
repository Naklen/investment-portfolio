import React, {useState} from 'react'
import { eel } from '../App'

export default function Portfolio() {    

    function insertJSON() {        
        eel.get_logged_in_user({a: 'a', b: 'b'})().then((res) => console.log(res))
    }
    return (
        <div>
            <h1 className="header">Портфель</h1>
            <div className="portfolio__body">
                <button onClick={insertJSON}>abc</button>
            </div>
        </div>
    )
}
