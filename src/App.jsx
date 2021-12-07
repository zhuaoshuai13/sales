import React from 'react'
import { Route  } from 'react-router-dom'
import Login from './views/login'
export default function App() {
  return (
    <div>
      <Route path="/login" component={Login}/>
    </div>
  )
}
