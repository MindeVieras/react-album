import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { List as VList, ListRowProps } from 'react-virtualized'
import { List } from 'antd'

import { albumsSelect } from '../../../actions'
import { IAlbumSelectedProps } from '../../../reducers'

interface IAlbumListProps {
  width: number
  height: number
  items: IAlbumSelectedProps[]
  loading?: boolean
  error?: string
}

/**
 * Albums list component.
 *
 * @returns {FunctionComponent<IAlbumListProps>}
 *   Functional 'AlbumsList' component.
 */
export const AlbumsList: FunctionComponent<IAlbumListProps> = ({
  width,
  height,
  items,
  loading,
  error,
}) => {
  const dispatch = useDispatch()
  const selectedAlbum = items.filter((a) => a.selected)[0]

  // console.log(selectedAlbum)

  const handleItemClick = (index: number) => {
    const item = items[index]

    // Select album.
    dispatch(albumsSelect(item.id))
  }

  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    const backgroundColor = items[index].selected ? '#e0e0e0' : '#ffffff'
    return (
      // Make list items as antd menu.
      <List.Item
        key={key}
        style={{
          ...style,
          width: '100%',
          paddingLeft: '5%',
          paddingRight: '5%',
          cursor: 'pointer',
          backgroundColor,
        }}
        onClick={() => handleItemClick(index)}
      >
        <List.Item.Meta title={items[index].name} />
      </List.Item>
    )
  }
  return (
    <List size="small" loading={loading}>
      <VList
        width={width}
        height={height}
        rowCount={items.length}
        rowHeight={40}
        rowRenderer={rowRenderer}
        scrollToIndex={items.indexOf(selectedAlbum)}
      />
    </List>
  )
}
