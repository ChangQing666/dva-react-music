import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './routes/Products';
import Countor from './routes/Countor';
import ClickTimesPage from './routes/ClickTimesPage';
import TranslatorPage from './routes/TranslatorPage';
import MusicPage from './routes/MusicPage';
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/products" component={Products} />
        <Route path="/countor" component={Countor} />
        <Route path="/clicktimes" component={ClickTimesPage} />
        <Route path="/translator" component={TranslatorPage} />
        <Route path="/music" component={MusicPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
