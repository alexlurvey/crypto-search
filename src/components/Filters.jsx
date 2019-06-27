import React, { useCallback } from 'react';

export const Filters = (props) => {
  const handleChange = useCallback(e => props.onSearchChange(e.target.value), []);

  return (
    <div className="filters">
      <div>
        <input className="input filter-search" type="text" placeholder="Search"
          onChange={handleChange} value={props.search} />
      </div>
      <div>
        <label className="checkbox">
          <input type="checkbox" style={{ marginRight: '5px' }} value={props.orderByMarketCap} onClick={props.toggleOrderByMarketCap} />
          Order by Marketcap
        </label>
      </div>
    </div>
  )
}