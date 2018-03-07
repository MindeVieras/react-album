
import React, { Component } from 'react'
import Pager from 'react-pager'

import MediaItem from './MediaItem'

class MediaList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentPage: 0,
      perPage: 8
    }

    this.handlePageChanged = this.handlePageChanged.bind(this)
  }
  
  handlePageChanged(newPage) {
    this.setState({ currentPage : newPage })
  }
  
  render() {
    const { files, uploader, wrapper_width } = this.props
    const { currentPage, perPage } = this.state

    const firstList = currentPage * perPage
    const lastList = firstList + perPage
    const currentFiles = files.slice(firstList, lastList)

    const totalPages = Math.ceil(files.length / perPage)

    let cols = 1, item_gap = 20
    
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
        <ul
          className="uploader-files"
          style={{paddingLeft: `${item_gap}px`}}
        >
          {currentFiles.map((file, i) => (
            <MediaItem
              key={ i }
              index={ i }
              uploader={ uploader }
              item_width={ item_width }
              item_gap={ item_gap }
              { ...file }
            />
          ))}
        </ul>

        {totalPages > 1 &&
          <Pager
            total={ totalPages }
            current={ currentPage }
            visiblePages={ 4 }
            titles={{ first: '<|', last: '>|' }}
            className="album-pagination"
            onPageChanged={this.handlePageChanged}
          />
        }

      </div>
    )
  }
}

export default MediaList
