import { useState, useEffect } from 'react'
import { mockData } from '../../../../apis/mockdata'
import Row from './Row/Row'

const list = ['Sách mới', 'Top tìm kiếm', 'Hot nhất tuần', 'Hot nhất tháng']
function ListRow() {
  return (
    <div style={{ marginBottom: 5 }}>
      {
        list.map((item, index) => (
          <Row item={item} key={index} />
        ))
      }
    </div>
  )
}

export default ListRow