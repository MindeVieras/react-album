import React, { FunctionComponent } from 'react'

import { AppHeader } from './Ui'

const MainLayout: FunctionComponent = (props) => {
  return (
    <div>
      <AppHeader />
      {props.children}
    </div>
  )
}

export default MainLayout
