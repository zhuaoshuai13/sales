import React from 'react'
import renderRoutes from '../../utils/render-routes'

export default function Employees(props) {
  console.log(props);
  return renderRoutes(props.route.children)
}
