import React from 'react';
import {BrowserRouter, Router, Route, Switch} from 'dva/router';

import Header from './routes/common/Header';
import Footer from './routes/common/Footer';
import Home from './routes/Home/Home';
import Album from './routes/Album/Album';
import Toplist from './routes/Toplist/Toplist';
import Playlist from './routes/Playlist/Playlist';
import TopArtistList from './routes/TopArtistList/TopArtistList';
import ArtistDetail from './routes/ArtistDetail/ArtistDetail';
import Song from './routes/Song/Song';
import App from './routes/App/App';
import styles from './routes/common/index.css'
function RouterConfig({history}) {
  return (
    <Router history={history}>
      <>
        <Header/>
        <div id={styles.wrapper}>
              {/*<App>*/}
                <Switch>
                    <Route path="/" exact={true} component={Home}/>
                    <Route path="/album/:id" component={Album}/>
                    <Route path="/song/:id" component={Song}/>
                    <Route path="/topList"  component={Toplist}/>
                    <Route path="/Playlist/:id"  component={Playlist}/>
                    <Route path="/topArtistList"  component={TopArtistList}/>
                    <Route path="/artistDetail/:id" component={ArtistDetail}/>
                </Switch>
              {/*</App>*/}
        </div>
        <Footer/>
      </>
    </Router>
  );
}

export default RouterConfig;
