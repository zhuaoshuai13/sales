import React from 'react'
import {render} from 'react-dom'
import App from './App'
import { HashRouter as Router} from 'react-router-dom';
import 'antd/dist/antd.less'
import { Provider } from 'react-redux'
import storeFN from './store'
import { PersistGate } from 'redux-persist/integration/react'

const {store, persistor} = storeFN()
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
