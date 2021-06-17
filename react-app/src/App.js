import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Extract from './components/Extract';
import ResultPage from './components/ResultPage';

import './stylesheets/custom.scss';
import './stylesheets/Page.scss';

function App() {
  const [extractedData, setExtractedData] = useState([]);

  return (
    <div className="page">
      <Router>
        <div>
          <Switch>
            <Route path="/extract">
              <Extract setExtractedData={setExtractedData} />
            </Route>
            <Route path="/results">
              <ResultPage extractedData={extractedData} setExtractedData={setExtractedData} />
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
