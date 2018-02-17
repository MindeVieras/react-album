
import React from 'react'
import { Range } from 'rc-slider'

const Bar = () => {
  return (
    <div className="filter-bar">
      {/*SELECT DISTINCT year(start_date) AS years FROM albums ORDER by years DESC*/}
      <Range
        onChange={(e) => console.log(e)}
      />
    </div>
  )
}

export default Bar
