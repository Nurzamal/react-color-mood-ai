import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './app/app'
import registerServiceWorker from './registerServiceWorker';

const Index = () => (
  <BrowserRouter>
  <Switch>
      <Route path="/" component={App} />
    </Switch>
  </BrowserRouter>
)

ReactDOM.render(<Index />, document.getElementById('root'));
registerServiceWorker();
