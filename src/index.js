import React from 'react'
import {render} from 'react-dom'
import { HashRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux'
import  {store, persistor}  from './store'
import { PersistGate } from 'redux-persist/integration/react'
import 'antd/dist/antd.less'
import App from './App'
render(
  <Provider store={store}>
    <Router>
      <PersistGate loading={null} persistor={persistor}>
        <App/>
      </PersistGate>
    </Router>
  </Provider>,
  document.getElementById('root')
)
