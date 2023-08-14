// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VideoUploader from './components/VideoUploader';
import VideoPage from './components/VideoPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={VideoUploader} />
        <Route path="/videoPage/:id" component={VideoPage} />
      </Switch>
    </Router>
  );
}

export default App;
