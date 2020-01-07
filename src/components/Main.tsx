import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Albums from './Albums/Albums'
import Trash from './Trash/Trash'
import Error404 from './404'

const Main = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Albums} />
        <Route path="/trash" component={Trash} />
        <Route component={Error404} />
      </Switch>
    </div>
  )
}

export default Main
