import React from 'react'
import { screenTypes } from '../utils/securitiesListTypes'
import SecuritiesListItem from './SecuritiesListItem'

export default function SecuritiesList({listType, screenType, securities}) {
    return (
        screenType === screenTypes.portfolio ?
            <div className="securities-list">
                {securities.map((sec) => <SecuritiesListItem listType={listType} screenType={screenType} secid={sec.SECID} key={sec.SECID}
                name={sec.SHORTNAME} price={sec.LAST} change={sec.CHANGE} changePercent={sec.LASTTOPREVPRICE} count={sec.count}/>)}
            </div>
            :
            <div className="securities-list">
                {securities.map((sec) => <SecuritiesListItem listType={listType} screenType={screenType} secid={sec.SECID} key={sec.SECID}
                    name={sec.SHORTNAME} price={sec.LAST} change={sec.CHANGE} changePercent={sec.LASTTOPREVPRICE}/>)}
            </div>
    )
}
