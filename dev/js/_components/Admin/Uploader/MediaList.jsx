
import React, { Component } from 'react'
import { SortableContainer, arrayMove } from 'react-sortable-hoc'

import MediaItem from './MediaItem'

const SortableList = SortableContainer(({files, uploader}) => {
  return (
    <ul className="uploader-files">
      {files.map((props, i) => (
        <MediaItem
          key={ i }
          index={ i }
          uploader={ uploader }
          { ...props }
        />
      ))}
    </ul>
  )
})

class MediaList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      files: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6']
    }

    this.onSortEnd = this.onSortEnd.bind(this)
  }

  onSortEnd({oldIndex, newIndex}) {
    console.log(oldIndex, newIndex)
    // this.setState({
    //   items: arrayMove(this.state.items, oldIndex, newIndex)
    // })
  }

  render() {

    const { files, uploader } = this.props

    return (
      <div>
        <SortableList
          axis={ `xy` }
          pressDelay={ 200 }
          lockToContainerEdges={ true }
          files={ files }
          uploader={ uploader }
          onSortEnd={ this.onSortEnd }
        />

      </div>
    )
  }
}

export default MediaList
