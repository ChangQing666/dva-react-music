import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import {Link} from 'dva/router'
function IndexPage() {
  return (
    <div className={styles.normal}>
      <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      <div className={styles.welcome} />
      <ul className={styles.list}>
        <li>To get started, edit <code>src/index.js</code> and save to reload.</li>
        <li><a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">Getting Started</a></li>
      </ul>
      <Link to='/countor'>加减计算</Link><br/>
      <Link to='/clicktimes'>1秒内最多点击次数</Link><br/>
      <Link to='/products'>产品列表</Link><br/>
      <Link to='/translator'>翻译</Link><br/>
      <Link to='/music'>音乐</Link>
    </div>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
