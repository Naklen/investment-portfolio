import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { eel } from '../App'
import SecurityParametersOfInstrument from '../components/SecurityParametersOfInstrument'
import SecurityTradeInfo from '../components/SecurityTradeInfo'

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
        setSecurity(await eel.get_security_data(market, board, secid)())
    }

    return (
        <div className="security-screen">
            <h1 className="security-screen__title">{security.SECNAME}</h1>
            <div className="security-screen__board">Режим торгов: {security.BOARDNAME} ({security.BOARDID})</div>
            <SecurityTradeInfo security={security} />
            <SecurityParametersOfInstrument security={security}/>
        </div>
    )
}
