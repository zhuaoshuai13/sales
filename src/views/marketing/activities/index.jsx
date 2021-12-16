import React from 'react'
import renderRoutes from '../../../utils/render-routes'
export default function Inventorys({route}) {
  console.log(route);
  return renderRoutes(route.children)
}
