import React from 'react';
import {connect} from 'dva';
import styles from './App.less';

const Loader = ()=>(
  <div className={styles.loaderWrapper}>
    <div className={styles.loader}>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
);
class App extends React.Component {
  render() {
    const { loading } = this.props;
    return (
      <div>
        { this.props.children }
        {loading && <Loader/>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.loading.global
  }
};

export default connect(mapStateToProps)(App);
