import React from "react";
import { BrowserRouter, Link, Route } from "react-router-dom"
import Exchange from './screens/exchange.jsx'
import Portfolio from './screens/portfolio.jsx'

function App() {
  return (
    <BrowserRouter>
      <div className="navmenu">
        <div className="navmenu__items">
          <Link to="/portfolio">Портфель</Link>
          <Link to="/exchange">Биржа</Link>
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
