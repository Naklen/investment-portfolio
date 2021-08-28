import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { eel } from '../App'

export default function Security() {
    const { market, board, secid } = useParams()
    const [security, setSecurity] = useState([])

    useEffect(() => {
        setSpecifiedSecurity(market, board, secid)
        const id = setInterval(() => {
            setSpecifiedSecurity(market, board, secid)
        }, 60*1000)
        return () => {
            clearInterval(id)
        }
    }, [market, board, secid])

    async function setSpecifiedSecurity(market, board, secid) {
        console.log('sec')
        setSecurity(await eel.get_security_data(market, board, secid)())
    }

    return (
        <div>
            <h1>{security.SECNAME}</h1>
        </div>
    )
}
