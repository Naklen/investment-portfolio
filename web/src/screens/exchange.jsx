import React, {useState, useEffect} from 'react'
import { eel } from '../App'
import SecuritiesList from '../components/SecuritiesList'

export default function Exchange() {
    const [state, setState] = useState([])

    useEffect(() => {
        getSharesListTQBR()
        const id = setInterval(() => {
            getSharesListTQBR()
        }, 60*1000)
        return () => {
            clearInterval(id)
        }
    }, [])

    async function getSharesListTQBR() {       
        setState(await eel.get_shares_list_tqbr()())
    }

    return (
        <div className="exchange">
            <h1 className="exchange__title">Биржа</h1>
            <div className="exchange__body">
                <SecuritiesList securities={state}></SecuritiesList>
            </div>
        </div>
    )
}