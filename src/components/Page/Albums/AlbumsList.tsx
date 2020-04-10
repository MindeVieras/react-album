import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { List as VList, ListRowProps } from 'react-virtualized'
import { List } from 'antd'

import { albumsGetOne, albumsSelect } from '../../../actions'
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

  const handleItemClick = (index: number) => {
    const item = items[index]

    // Select album.
    dispatch(albumsSelect(item.id))

    // Load album only if not loaded.
    if (!item.isLoaded) {
      dispatch(albumsGetOne(items[index].id))
    }
  }

  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    return (
      // Make list items as antd menu...
      <List.Item
        key={key}
        style={{ ...style, left: '5%', width: '90%', cursor: 'pointer' }}
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
      />
    </List>
  )
}
