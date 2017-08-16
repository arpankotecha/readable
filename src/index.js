import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/bulma/css/bulma.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, compose } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'

const store = createStore(
  reducer
)

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>, 
  document.getElementById('root')
);
registerServiceWorker();
