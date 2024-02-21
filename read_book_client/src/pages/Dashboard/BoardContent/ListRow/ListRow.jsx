import { useState, useEffect } from 'react'
import categoryApi from '../../../../apis/categoryApi'
import Row from './Row/Row'

function ListRow() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    categoryApi.getAllEnabledCategories()
      .then(response => {
        setCategories(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
      {categories?.map((category, index) => <Row category={category} key={index} />)}
    </>
  )
}

export default ListRow