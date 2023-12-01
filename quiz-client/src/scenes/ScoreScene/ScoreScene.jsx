import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton, Table } from 'antd'
import { Scene } from '../../components/Scene'
import { getUsersResults } from '../../app/slicers/userSlice'
import { FetchStatus } from '../../app/constants'

function ScoreScene() {
  const { usersScore, status } = useSelector((state) => state.user)
  const usersScoreIsLoading = status === FetchStatus.LOADING
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsersResults())
  }, [dispatch])

  const columns = [
    {
      title: 'Összpontszám',
      dataIndex: 'scores',
      key: 'scores',
    },
    {
      title: 'Felhasználónév',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Születési év',
      dataIndex: 'year',
      key: 'year',
    },
  ]

  return (
    <Scene title="Pontlista">
      <Skeleton loading={usersScoreIsLoading}>
        <Table
          rowKey="userId"
          dataSource={usersScore}
          columns={columns}
          pagination={false}
        />
      </Skeleton>
    </Scene>
  )
}

export default ScoreScene
