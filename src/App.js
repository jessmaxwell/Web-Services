import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';
import MainComponent from './components/MainComponent';
import UpdateContactComponent from './components/UpdateContactComponent';
import React from "react";

// Which URL should be loaded for each component in order to display the correct content
function App() {
  return (
      <div>
          <Router>
              <div className="container">
                  <Switch>
                          
                          <Route path = "/" exact component={MainComponent}/>
                          <Route path = "/contacts" component={MainComponent}/>
                          <Route path = "/update-contacts/:id" component={UpdateContactComponent}/>
                  </Switch>
              </div>
          </Router>
      </div>
  );
}

export default App;

