// import React from 'react'
// import { Route  } from 'react-router-dom'
// import Login from './views/login'
// import FrameLayout from './layout/frame-layout'
import renderRoutes from './utils/render-routes'
import routes from './routes'
export default function App() {
  return (
    renderRoutes(routes)
  )
}
