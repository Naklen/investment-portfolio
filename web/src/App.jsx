import React from "react";
import { BrowserRouter, Route } from "react-router-dom"
import Navmenu from "./components/Navmenu.jsx";
import Exchange from './screens/Exchange.jsx'
import Portfolio from './screens/Portfolio.jsx'
import './styles/App.css'

export const eel = window.eel
eel.set_host('ws://localhost:8080')

function App() {  
    return (
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
          </div>
        </div>                      
      </BrowserRouter>
    </main>
  );
}

export default App;
