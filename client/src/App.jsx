// eslint-disable-next-line no-unused-vars
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import VideoUploader from './components/VideoUploader';
import VideoPage from './components/VideoPage';
import NotFound from './components/NotFound';
import Logo from './components/Logo';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <Logo />
      <Switch>
        <Route path="/" exact component={VideoUploader} />
        <Route path="/v/:id" component={VideoPage} />
        <Route  component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
