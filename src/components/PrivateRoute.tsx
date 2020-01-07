import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'

const PrivateRoute: React.SFC<RouteProps> = ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('user') ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
      )
    }
  />
)

export default PrivateRoute
