import React from 'react'
import {Route, Switch} from 'react-router-dom'

const renderRoutes = (routes) => {
  {
    return routes ? (
      <Switch>
        {
          routes.map((route) => (
            <Route
              path={route.path}
              key={route.path}
              render={(props) => route.render ? (
                route.render({...props})
              ) : (
                <route.component {...props} route={route}/>
              )}
            />
          ))
        }
      </Switch>
    ) : null
  }
}
export default renderRoutes
