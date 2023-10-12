import React from 'react';
import VendingMachine from "./VendingMachine";
import Soda from "./Soda";
import Chips from "./Chips";
import Sardines from "./Sardines";
import Navbar from './Navbar';
import { Route, Switch } from "react-router-dom";
import './App.css';
//npm uninstall react-router-dom
//npm install react-router-dom@5

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={VendingMachine}/>
        <Route exact path="/chips" component={Chips}/>
        <Route exact path="/sardines" component={Sardines}/>
        <Route exact path="/soda" component={Soda}/>
      </Switch>
    </div>
  );
}

export default App;
