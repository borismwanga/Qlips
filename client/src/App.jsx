// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VideoUploader from './components/VideoUploader';
import VideoPage from './components/VideoPage';
import NotFound from './components/NotFound';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={VideoUploader} />
        <Route path="/v/:id" component={VideoPage} />
        <Route  component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
