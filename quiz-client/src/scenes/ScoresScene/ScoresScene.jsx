import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton, Table } from 'antd'
import { Scene } from '../../components/Scene'
import { getUsersResults } from '../../app/slicers/userSlice'
import { FetchStatus } from '../../app/constants'
import './ScoresScene.scss'

const columns = [
  {
    title: 'Helyezés',
    dataIndex: 'position',
    key: 'position',
    width: 50,
  },
  {
    title: 'Összpontszám',
    dataIndex: 'scores',
    key: 'scores',
    align: 'center',
  },
  {
    title: 'Felhasználónév',
    dataIndex: 'username',
    key: 'username',
    align: 'center',
  },
  {
    title: 'Életkor',
    dataIndex: 'age',
    key: 'age',
    align: 'center',
  },
]

function ScoresScene() {
  const { usersScore, status } = useSelector((state) => state.user)
  const usersScoreIsLoading = status === FetchStatus.LOADING
  const dispatch = useDispatch()

  const addPositionAndAgeToScores = (scores) => {
    const extendedResponse = []

    for (let index = 0; index < scores.length; index += 1) {
      const responseValues = scores[index]
      const result = {
        position: `${index + 1}.`,
        age: new Date().getFullYear() - responseValues.year,
        ...responseValues,
      }
      extendedResponse.push(result)
    }

    return extendedResponse
  }

  useEffect(() => {
    dispatch(getUsersResults())
  }, [dispatch])

  return (
    <Scene title="Pontlista">
      <Skeleton loading={usersScoreIsLoading}>
        <Table
          rowKey="userId"
          dataSource={addPositionAndAgeToScores(usersScore)}
          columns={columns}
          pagination={false}
          className="scores-table"
        />
      </Skeleton>
    </Scene>
  )
}

export default ScoresScene
