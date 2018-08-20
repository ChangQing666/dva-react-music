import React from 'react';
import {BrowserRouter, Router, Route, Switch} from 'dva/router';

import Header from './routes/common/Header';
import Footer from './routes/common/Footer';
import Home from './routes/Home';
import Toplist from './routes/Toplist';
import ToplistDetail from './routes/ToplistDetail';
import TopArtistList from './routes/TopArtistList';
import ArtistDetail from './routes/ArtistDetail';
import styles from './routes/common/index.css'
function RouterConfig({history}) {
  return (
    <Router history={history}>
      <>
        <Header/>
        <div id={styles.wrapper}>
            <Switch>
              <Route path="/" exact component={Home}/>
              <Route path="/topList"  component={Toplist}/>
              <Route path="/toplistDetail/"  component={ToplistDetail}/>
              <Route path="/topArtistList"  component={TopArtistList}/>
              <Route path="/artistDetail/:id" component={ArtistDetail}/>
            </Switch>
        </div>
        <Footer/>

      </>
    </Router>
  );
}

export default RouterConfig;
