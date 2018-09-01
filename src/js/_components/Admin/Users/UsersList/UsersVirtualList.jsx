
import React from 'react'
import ConfigurableExample from './ConfigurableExample'

const MyList = ({
  virtual,
  itemHeight,
}) => (
  <ul className="media-list list-group" style={ virtual.style }>
    {virtual.items.map(item => (
      <li key={`item${item.id}`} className="list-group-item" style={{height: itemHeight }}>
        <div className="media-left">
          img
        </div>
        <div className="media-body">
          <h4 className="media-heading">{ item.title }</h4>
          <p>{ item.text }</p>
        </div>
      </li>
    ))}
  </ul>
)

const UsersVirtualList = ConfigurableExample(MyList)

export default UsersVirtualList
