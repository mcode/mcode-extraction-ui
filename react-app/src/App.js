import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Extract from './components/Extract';
import ResultPage from './components/ResultPage';
import ExtractionError from './components/ExtractionError';
import ConfigMenu from './components/ConfigMenu';
import ConfigEditor from './components/ConfigEditor';

import './stylesheets/custom.scss';
import './stylesheets/Page.scss';

function App() {
  const [extractedData, setExtractedData] = useState([]);
  const [loggedMessages, setLoggedMessages] = useState([]);

  return (
    <div className="page">
      <Router>
        <div>
          <Switch>
            <Route path="/extract">
              <Extract setExtractedData={setExtractedData} setLoggedMessages={setLoggedMessages} />
            </Route>
            <Route path="/results">
              <ResultPage
                extractedData={extractedData}
                setExtractedData={setExtractedData}
                loggedMessages={loggedMessages}
              />
            </Route>
            <Route path="/extraction-error">
              <ExtractionError loggedMessages={loggedMessages} />
            </Route>
            <Route path="/config-menu">
              <ConfigMenu />
            </Route>
            <Route path="/config-editor">
              <ConfigEditor />
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
