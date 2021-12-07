import React from 'react'
import renderRoutes from '../../../utils/render-routes'
export default function Inventorys({route}) {
  return renderRoutes(route.children)
}
