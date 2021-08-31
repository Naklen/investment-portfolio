import React, { useState } from "react";
import { BrowserRouter, Route } from "react-router-dom"
import Navmenu from "./components/Navmenu.jsx";
import Exchange from './screens/Exchange.jsx'
import Portfolio from './screens/Portfolio.jsx'
import Security from "./screens/Security.jsx";
import './styles/App.css'
import { ExchangeContext } from './context'

export const eel = window.eel
eel.set_host('ws://localhost:8080')

function App() {
  const [exchangeState, setExchangeState] = useState({ market: 'shares', board: 'tqbr', sort: { option: '', isDescending: false }, searchQuery: '' })  
  return (
    <ExchangeContext.Provider value={{
      exchangeState,
      setExchangeState
      }}>
      <main className="main">    
        <BrowserRouter>        
          <Navmenu/>
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
        </BrowserRouter>    
      </main>
    </ExchangeContext.Provider>
  );
}

export default App;
