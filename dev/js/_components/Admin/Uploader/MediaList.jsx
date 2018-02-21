
import React, { Component } from 'react'
import { SortableContainer, arrayMove } from 'react-sortable-hoc'

import MediaItem from './MediaItem'

const SortableList = SortableContainer(({files, uploader, item_width, item_gap}) => {

  return (
    <ul
      className="uploader-files"
      style={{paddingLeft: `${item_gap}px`}}
    >
      {files.map((props, i) => (
        <MediaItem
          key={ i }
          index={ i }
          uploader={ uploader }
          item_width={ item_width }
          item_gap={ item_gap }
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
    const { files, uploader, wrapper_width } = this.props
    let cols = 1
    let item_gap = 20
    if (wrapper_width < 680 && wrapper_width >= 480) {
      cols = 2
    }
    else if (wrapper_width >= 680 && wrapper_width < 1000) {
      cols = 3
    }
    else if (wrapper_width >= 1000) {
      cols = 4
    }
    
    let allGaps = (cols + 1) * item_gap
    let item_width = (wrapper_width - allGaps) / cols
    // console.log(wrapper_width)
    return (
      <div>
        <SortableList
          axis={ `xy` }
          pressDelay={ 200 }
          lockToContainerEdges={ true }
          files={ files }
          uploader={ uploader }
          item_width={ item_width }
          item_gap={ item_gap }
          onSortEnd={ this.onSortEnd }
        />

      </div>
    )
  }
}

export default MediaList
