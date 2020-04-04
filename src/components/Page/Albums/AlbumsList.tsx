import React, { useEffect, FunctionComponent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { List as VList, ListRowProps } from 'react-virtualized'
import { List } from 'antd'

import { albumsGetList } from '../../../actions'
import { IStoreState } from '../../../reducers'

interface IAlbumListProps {
  width: number
  height: number
}

/**
 * Albums list component.
 *
 * @returns {FunctionComponent<IAlbumListProps>}
 *   Functional 'AlbumsList' component.
 */
export const AlbumsList: FunctionComponent<IAlbumListProps> = ({ width, height }) => {
  const dispatch = useDispatch()
  const { items, loading, error, pager } = useSelector((state: IStoreState) => state.albums.list)

  useEffect(() => {
    // Get list of albums.
    // Load only if no albums loaded yet.
    if (!items.length) {
      dispatch(albumsGetList({ limit: 250 }))
    }
  }, [dispatch])

  const rowRenderer = ({ index, key, style }: ListRowProps) => {
    return (
      <List.Item key={key} style={style}>
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
        rowHeight={30}
        rowRenderer={rowRenderer}
      />
    </List>
  )
}
