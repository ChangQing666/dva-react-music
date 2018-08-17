import dva from 'dva';
import './index.css';
import createHistory from 'history/createBrowserHistory';

// 1. Initialize
const app = dva({
  history: createHistory(),
  initialState: {
    products: [
      {name: 'dva', id: 1},
      {name: 'antd', id: 2},
    ]
  },
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/products').default);
app.model(require('./models/countor').default);
app.model(require('./models/clickTimes').default);
app.model(require('./models/trasnlator').default);
app.model(require('./models/music').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
