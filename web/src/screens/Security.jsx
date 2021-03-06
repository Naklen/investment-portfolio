import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { eel } from '../App'
import SecurityParametersOfInstrument from '../components/SecurityParametersOfInstrument'
import SecurityTradeInfo from '../components/SecurityTradeInfo'
import UserSecurityCount from '../components/UserSecurityCount'
import { Context } from '../context'

export default function Security() {
    const { market, board, secid } = useParams()
    const [security, setSecurity] = useState([])
    const {user} = useContext(Context)

    useEffect(() => {
        setSpecifiedSecurity(market, board, secid)
        const id = setInterval(() => {
            setSpecifiedSecurity(market, board, secid)
        }, 60*60*1000)
        return () => {
            clearInterval(id)
        }
    }, [market, board, secid])

    async function setSpecifiedSecurity(market, board, secid) {
        setSecurity(await eel.get_security_data(market, board, secid)())
    }

    return (
        <div className="security-screen">
            <h1 className="security-screen__title header">{security.SECNAME}</h1>
            {
                Object.keys(user).length !== 0 &&
                <UserSecurityCount market={market} board={board} secid={secid} price={security.LAST}/>
            }
            <div className="security-screen__board">Режим торгов: {security.BOARDNAME} ({security.BOARDID})</div>
            <SecurityTradeInfo security={security} market={market}/>
            <SecurityParametersOfInstrument security={security} market={market}/>
        </div>
    )
}
