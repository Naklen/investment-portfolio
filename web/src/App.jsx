import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom"
import Navmenu from "./components/Navmenu.jsx";
import Exchange from './screens/Exchange.jsx'
import Portfolio from './screens/Portfolio.jsx'
import Security from "./screens/Security.jsx";
import './styles/App.css'
import { Context } from './context'
import LoginModal from "./components/LoginModal.jsx";

export const eel = window.eel
eel.set_host('ws://localhost:8080')

function App() {
  const [exchangeState, setExchangeState] = useState({ market: 'shares', board: 'tqbr', sort: { option: '', isDescending: false }, searchQuery: '' })
  const [user, setUser] = useState({})
  const [portfolioSortAndFilter, setPortfolioSortAndFilter] = useState({ sort: { option: '', isDescending: false }, searchQuery: '' })
  const [loginModalVisible, setLoginModalVisible] = useState(false)
  
  return (
    <Context.Provider value={{
      exchangeState,
      setExchangeState,
      user,
      setUser,
      portfolioSortAndFilter,
      setPortfolioSortAndFilter,
      loginModalVisible,
      setLoginModalVisible
      }}>
      <main className="main">    
        <BrowserRouter>        
          <Navmenu setLoginModalVisible={setLoginModalVisible}/>
          <div className="screen-layout">
            <div className="navmenu-fake"/>
            <div className="screen">
              <Route path="/portfolio">
                <Portfolio/>
              </Route>
              <Route path="/exchange">
                <Exchange/>
              </Route>
              <Route path="/security/:market/:board/:secid">
                <Security/>
              </Route>
            </div>
          </div>
          <LoginModal visible={loginModalVisible} setVisible={setLoginModalVisible}></LoginModal>
        </BrowserRouter>    
      </main>
    </Context.Provider>
  );
}

export default App;
