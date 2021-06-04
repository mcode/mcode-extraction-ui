import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Extract from './components/Extract';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './stylesheets/Page.css';

function App() {
  return (
    <div className="page">
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path="/extract">
              <Extract />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
