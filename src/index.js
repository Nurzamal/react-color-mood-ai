import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import MainPage from './app/pages/MainPage'
import registerServiceWorker from './registerServiceWorker';

const Index = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={MainPage} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
