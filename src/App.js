import { BrowserRouter as Router, Route } from "react-router-dom";
import React from 'react';
import Home from './components/Home/home';
import TechniqueDetails from './components/Technique/technique';

function App() {
  return (
    <div>
    <Router>
      <Route exact path="/" component={Home} />   
      <Route exact path="/technique/:techniqueName" component={TechniqueDetails} />      
    </Router>
    </div>
  );
}


export default App;
