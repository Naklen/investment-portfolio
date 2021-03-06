import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../context'
import EditIcon from '../components/icons/EditIcon'
import CrossIcon from '../components/icons/CrossIcon'
import SaveIcon from '../components/icons/SaveIcon'
import Input from '../components/UI/input/Input'
import { eel } from '../App'
import Button from '../components/UI/button/Button'
import TransactionsList from '../components/transactionList/TransactionsList'

export default function Profile() {
    const { user, setUser, setDeleteUserModalVisible, setClearDBModalVisible } = useContext(Context)
    const [nameExpand, setNameExpand] = useState(false)
    const [nameDanger, setNameDanger] = useState(false)
    const [newName, setNewName] = useState('')
    const [passExpand, setPassExpand] = useState(false)
    const [prevPassDanger, setPrevPassDanger] = useState(false)
    const [confirmDanger, setConfirmDanger] = useState(false)
    const [newPassForm, setNewPassForm] = useState({prevPass: '', newPass: '', confirmPass: ''})
    

    const editName = async (e) => {
        e.preventDefault()
        const editedUser = await eel.try_edit_user_name(user.id, newName)()        
        if (editedUser.hasOwnProperty('name')) {
            setUser(editedUser)
            setNameExpand(false)
        }            
        if (editedUser.hasOwnProperty('error')) {
            if (editedUser.error === 'user already exist')
                setNameDanger(true)
            if (editedUser.error === 'empty string')
                setNameDanger(true)
        }
    }
    
    const editPass = async (e) => {
        e.preventDefault()
        if (newPassForm.newPass !== '' && newPassForm.newPass !== newPassForm.confirmPass) {
            setConfirmDanger(true)
            return
        }
        const editedUser = await eel.try_edit_user_password(user.id, newPassForm.prevPass, newPassForm.newPass)()        
        if (editedUser.hasOwnProperty('name')) {
            setUser(editedUser)
            setPassExpand(false)
        }            
        if (editedUser.hasOwnProperty('error')) {
            if (editedUser.error === 'wrong password')
                setPrevPassDanger(true)
        }
    }

    useEffect(() => {
        if (!nameExpand) {
            setNameDanger(false)
            setNewName('')
        }
        if (!passExpand) {
            setPrevPassDanger(false)
            setConfirmDanger(false)
            setNewPassForm({prevPass: '', newPass: '', confirmPass: ''})
        }
    }, [nameExpand, passExpand])

    let namePlacehoder
    if (nameDanger) {
        if (newName === null || newName === '')
            namePlacehoder = '?????????????? ??????'
        else
            namePlacehoder = '?????? ?????? ????????????'
    }
    else
        namePlacehoder = '?????????? ??????'
    
    const prevPassPlaceholder = prevPassDanger ? '???????????????? ????????????' : '?????????????? ????????????'
    const confirmPlaceholder = confirmDanger ? '???????????? ???? ??????????????????' : '?????????????????????????? ????????????'

    return (
        <div className="profile">
            <h1 className="profile__header header">??????????????</h1>
            <div className="profile__body">
                <div className="profile__info">
                    <h2>???????????????????? ?? ??????????????</h2>
                    <div className={`profile__name${nameExpand ? ' profile__name_expand' : ''}`}>
                        <div className="profile__current-name">
                            ?????? ??????????????:&nbsp;
                            <span>{user.name}</span>
                            <span className="profile__edit-button" onClick={() => setNameExpand(!nameExpand)} title={nameExpand ? '??????????????' : '????????????????'}>
                                {
                                    nameExpand ?
                                        <CrossIcon className="profile__icon profile__cross"></CrossIcon>
                                        :
                                        <EditIcon className="profile__icon profile__edit"></EditIcon>
                                }
                            </span>
                        </div>
                        {
                            user.name !== 'Admin' ?
                                <form className="profile__new-name">
                                    <Input isDangerous={nameDanger} autocomplete="off" id="editName" placeholder={namePlacehoder} type="text" value={newName}
                                        onChange={e => { setNameDanger(false); setNewName(e.target.value) }}>
                                    </Input>
                                    <Button className="profile__edit-button" onClick={e => editName(e)} title="??????????????????">
                                        <SaveIcon className="profile__icon profile__save"></SaveIcon>
                                    </Button>
                                </form>
                                :
                                <div className="profile__new-name">???????????? ?????????????? ?????? ?????????????? ????????????????????????????</div>
                        }
                    </div>
                    <div className={`profile__pass${passExpand ? ' profile__pass_expand' : ''}`}>                                                                           
                        <Button isDangerous={passExpand} onClick={e => setPassExpand(!passExpand)} > {passExpand ? '??????????????' : '?????????????? ????????????'}</Button>                        
                        <form className="profile__new-pass">
                            <Input isDangerous={prevPassDanger}
                                autocomplete="off"
                                id="oldPass"
                                placeholder={prevPassPlaceholder}
                                type="password"
                                value={newPassForm.prevPass}
                                onChange={e => { setPrevPassDanger(false); setNewPassForm({...newPassForm, prevPass: e.target.value}) }}>
                            </Input>
                            <Input autocomplete="off"
                                id="newPass"
                                placeholder="?????????? ????????????"
                                type="password"
                                value={newPassForm.newPass}
                                onChange={e => setNewPassForm({...newPassForm, newPass: e.target.value})}>
                            </Input>
                            <Input isDangerous={confirmDanger}
                                autocomplete="off"
                                id="confirmNewPass"
                                placeholder={confirmPlaceholder}
                                type="password"
                                value={newPassForm.confirmPass}
                                onChange={e => { setConfirmDanger(false); setNewPassForm({...newPassForm, confirmPass: e.target.value}) }}>
                            </Input>
                            <Button className="profile__edit-button" onClick={e => editPass(e)} title="??????????????????">
                                <SaveIcon className="profile__icon profile__save"></SaveIcon>
                            </Button>
                        </form>
                    </div>                    
                    {
                        user.name === 'Admin' ?
                            <div className="profile__clearBD">
                                <Button isDangerous={true} onClick={() => setClearDBModalVisible(true)}>???????????????? ???????? ????????????</Button>
                            </div>
                            :
                            <div className="profile__delete">
                                <Button isDangerous={true} onClick={() => setDeleteUserModalVisible(true)}>?????????????? ??????????????</Button>
                            </div>
                    }
                </div>
                <div className="profile__transactions-history">
                    <TransactionsList></TransactionsList>            
                </div>
            </div>
        </div>
    )
}
