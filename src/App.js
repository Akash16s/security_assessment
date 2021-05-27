import { BrowserRouter as Router, Route } from "react-router-dom";
import React from 'react';
import Home from './components/Home/home';

function App() {
  return (
    <div>
    <Router>
      <Route exact path="/" component={Home} />      
    </Router>
    </div>
  );
}


export default App;
