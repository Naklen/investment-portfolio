import React from 'react'
import SecuritiesListItem from './SecuritiesListItem'

export default function SecuritiesList({securities}) {
    return (
        <div className="securities-list">
            {securities.map((sec) => <SecuritiesListItem secid={sec.SECID} key={sec.SECID}
                name={sec.SHORTNAME} price={sec.LAST} change={sec.CHANGE} changePercent={sec.LASTTOPREVPRICE}/>)}
        </div>
    )
}
