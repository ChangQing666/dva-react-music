import React from 'react';
import {BrowserRouter, Router, Route, Switch} from 'dva/router';

import Header from './routes/common/Header';
import Footer from './routes/Footer';
import Toplist from './routes/Toplist';
import ToplistDetail from './routes/ToplistDetail';
import TopArtistList from './routes/TopArtistList';
import ArtistDetail from './routes/ArtistDetail';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <>
        <Header/>
        <Footer/>
        <Switch>
          <Route path="/" exact component={Toplist}/>
          <Route path="/toplistDetail"  component={ToplistDetail}/>
          <Route path="/topArtistList"  component={TopArtistList}/>
          <Route path="/artistDetail" component={ArtistDetail}/>
          <Route path="/topList" component={ToplistDetail}/>
        </Switch>
      </>
    </Router>
  );
}

export default RouterConfig;
