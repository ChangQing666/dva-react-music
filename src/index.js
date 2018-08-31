import dva from 'dva';
import createLoading from 'dva-loading';
import './index.css';
import createHistory from 'history/createBrowserHistory';

// 1. Initialize
const app = dva({
  // history: createHistory(),
  initialState: {},
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/music').default);
// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
