import React from 'react'
import ParameterOfInstrument from './ParameterOfInstrument'
import { faceUnits, secTypes } from '../utils/moexTypes'
import { nf } from '../utils/numberFormat'

export default function SecurityParametersOfInstrument({security, market}) {
    return (
        <div className="security-screen__params-of-instr">
            <h2 className="params-of-instr__header">Параметры инструмента</h2>
            <ul>
                <ParameterOfInstrument pName="Код ценной бумаги" pValue={ security.SECID } />
                <ParameterOfInstrument pName="Полное наименование" pValue={ security.SECNAME } />
                <ParameterOfInstrument pName="Краткое наименование" pValue={ security.SHORTNAME } />
                <ParameterOfInstrument pName="ISIN код" pValue={ security.ISIN } />
                {security.REGNUMBER && <ParameterOfInstrument pName="Номер государственной регистрации" pValue={ security.REGNUMBER } />}
                <ParameterOfInstrument pName="Объем выпуска" pValue={ nf(security.ISSUESIZE) } />
                <ParameterOfInstrument pName="Номинальная стоимость" pValue={ security.FACEVALUE } />
                <ParameterOfInstrument pName="Валюта номинала" pValue={ faceUnits[security.FACEUNIT] } />
                <ParameterOfInstrument pName="Вид/категория ценной бумаги" pValue={ secTypes[security.SECTYPE] } />
                <ParameterOfInstrument pName="Количество ценных бумаг в одном стандартном лоте" pValue={ security.LOTSIZE } />
                <ParameterOfInstrument pName="Группа инструментов" pValue={ security.INSTRID } />
                <ParameterOfInstrument pName="Дата расчетов сделки" pValue={security.SETTLEDATE} />
                {
                    market === 'bonds' &&
                    <div>
                        <ParameterOfInstrument pName="Дата погашения" pValue = { security.MATDATE }/>
                        <ParameterOfInstrument pName="Дата выплаты купона" pValue = { security.NEXTCOUPON }/>
                        <ParameterOfInstrument pName="Ставка купона, %" pValue = { security.COUPONPERCENT }/>
                        <ParameterOfInstrument pName="Сумма купона, в валюте номинала" pValue = { security.COUPONVALUE }/>
                        <ParameterOfInstrument pName="Доходность по оценке пред. дня" pValue = { security.YIELDATPREVWAPRICE }/>
                        <ParameterOfInstrument pName="НКД на дату расчетов, в валюте расчетов" pValue = { security.ACCRUEDINT }/>
                        <ParameterOfInstrument pName="Количество ценных бумаг в обращении" pValue = { nf(security.ISSUESIZEPLACED) }/>                        
                    </div>
                }
            </ul>
        </div>
    )
}
