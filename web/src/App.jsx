import React, { useState } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import Navmenu from "./components/Navmenu.jsx";
import Exchange from './screens/Exchange.jsx'
import Portfolio from './screens/Portfolio.jsx'
import Security from "./screens/Security.jsx";
import './styles/App.css'
import { Context } from './context'
import LoginModal from "./components/LoginModal.jsx";
import NewUserModal from "./components/NewUserModal.jsx";
import Profile from "./screens/Profile.jsx";
import DeleteUserModal from "./components/DeleteUserModal.jsx";
import ClearDBModal from "./components/ClearDBModal.jsx";

export const eel = window.eel
eel.set_host('ws://localhost:8080')

function App() {
  const [exchangeState, setExchangeState] = useState({ market: 'shares', board: 'tqbr', sort: { option: '', isDescending: false }, searchQuery: '' })
  const [user, setUser] = useState({})
  const [portfolioSortAndFilter, setPortfolioSortAndFilter] = useState({ sort: { option: '', isDescending: false }, searchQuery: '' })
  const [loginModalVisible, setLoginModalVisible] = useState(false)
  const [newUserModalVisible, setNewUserModalVisible] = useState(false)
  const [deleteUserModalVisible, setDeleteUserModalVisible] = useState(false)
  const [clearDBModalVisible, setClearDBModalVisible] = useState(false)
  
  return (
    <Context.Provider value={{
      exchangeState,
      setExchangeState,
      user,
      setUser,
      portfolioSortAndFilter,
      setPortfolioSortAndFilter,
      loginModalVisible,
      setLoginModalVisible,
      newUserModalVisible,
      setNewUserModalVisible,
      deleteUserModalVisible,
      setDeleteUserModalVisible,
      clearDBModalVisible,
      setClearDBModalVisible
      }}>
      <main className="main">    
        <BrowserRouter>        
          <Navmenu setLoginModalVisible={setLoginModalVisible} setNewUserModalVisible={setNewUserModalVisible}/>
          <div className="screen-layout">
            <div className="navmenu-fake"/>
            <div className="screen">
              <Switch>
                <Route path="/portfolio">
                  <Portfolio/>
                </Route>
                <Route path="/exchange">
                  <Exchange/>
                </Route>
                <Route path="/security/:market/:board/:secid">
                  <Security/>
                </Route>
                <Route path="/profile">
                  <Profile/>
                </Route>
                <Redirect to="/exchange"/>                
              </Switch>
            </div>
          </div>
          <LoginModal visible={loginModalVisible} setVisible={setLoginModalVisible}></LoginModal>
          <NewUserModal visible={newUserModalVisible} setVisible={setNewUserModalVisible}></NewUserModal>
          <DeleteUserModal visible={deleteUserModalVisible} setVisible={setDeleteUserModalVisible}></DeleteUserModal>
          <ClearDBModal visible={clearDBModalVisible} setVisible={setClearDBModalVisible}></ClearDBModal>
        </BrowserRouter>    
      </main>
    </Context.Provider>
  );
}

export default App;
