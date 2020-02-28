import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Container from './components/Container'
import About from './components/About'

import './App.css';

function App() {

  return (
    <div className="App">
      <Router>  
        <Switch>
          <Route path="/about" component={About} />
          <Route path="/" component={Container} />
        </Switch>
        <footer>
          <ul>
          <h6>
          <li><Link to="/">Main</Link></li>
          <li><Link to="/about">About</Link></li>
          </h6>
        </ul>
        </footer>
      </Router>
    </div >
  );
}

export default App;
