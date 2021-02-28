import React, { FunctionComponent, Fragment } from 'react'
import { Translate } from 'react-redux-i18n'
import { Select, Tooltip } from 'antd'

interface IFilterItemsPerPageProps {
  total: number
  limit: number
  onChange(value: number): void
}

export const FilterItemsPerPage: FunctionComponent<IFilterItemsPerPageProps> = ({
  total,
  limit,
  onChange,
}) => {
  // Available options.
  const options = [5, 10, 25, 50, 100, 200, 500]

  return (
    <Fragment>
      {total > limit && (
        <Tooltip title={<Translate value="tooltip.filterItemsPerPage" />}>
          <Select defaultValue={limit} style={{ width: 68 }} onChange={onChange}>
            {options.map((option) => {
              if (option <= total) {
                return (
                  <Select.Option key={option} value={option}>
                    {option}
                  </Select.Option>
                )
              }
              return null
            })}
            <Select.Option value={-1}>All</Select.Option>
          </Select>
        </Tooltip>
      )}
    </Fragment>
  )
}
