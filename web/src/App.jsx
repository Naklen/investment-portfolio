import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom"
import Exchange from './screens/Exchange.jsx'
import Portfolio from './screens/Portfolio.jsx'

export const eel = window.eel
eel.set_host('ws://localhost:8080')

function App() {
  return (
    <BrowserRouter>
      <div className="navmenu">
        <div className="navmenu__items">
          <Link to="/Portfolio">Портфель</Link>
          <Link to="/Exchange">Биржа</Link>
        </div>
      </div>
      <Route path="/portfolio">
        <Portfolio/>
      </Route>
      <Route path="/exchange">
        <Exchange/>
      </Route>      
    </BrowserRouter>
  );
}

export default App;
