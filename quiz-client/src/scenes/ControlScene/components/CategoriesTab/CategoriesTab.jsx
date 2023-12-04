import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton, Table } from 'antd'
import { getCategories } from '../../../../app/slicers/categorySlice'
import './CategoriesTab.scss'

const columns = [
  {
    title: 'Témakörök',
    dataIndex: 'name',
    key: 'name',
    align: 'center',
  },
]

function CategoriesTab() {
  const { categories, loading } = useSelector((state) => state.category)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!categories.length) {
      dispatch(getCategories())
    }
  }, [categories, dispatch])

  return (
    <Skeleton loading={loading}>
      <Table
        rowKey="_id"
        dataSource={categories}
        columns={columns}
        pagination={false}
        className="categories-tab"
      />
    </Skeleton>
  )
}

export default CategoriesTab
