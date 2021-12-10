import React from 'react'
import renderRoutes from '../../utils/render-routes'
export default function Sales(props) {
  return renderRoutes(props.route.children)
}
