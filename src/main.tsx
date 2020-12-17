import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { App } from './app';
import { createStore, Store } from 'redux';
import { connectStore, wrapReducer } from 'app/slicer';
import { RootState } from './compose.shared';
// import 'bootstrap-css-only/css/bootstrap.css';
import './styles.tailwind.css';

const history = createBrowserHistory();

const store = createStore(
  wrapReducer(() => {}) as any,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
) as Store<RootState>;
connectStore(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
