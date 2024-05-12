import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton, Table } from 'antd'
import { Scene } from '../../components/Scene'
import { getUserResults } from '../../app/slicers/userSlice'
import { FetchStatus } from '../../app/constants'
import './ResultsScene.scss'

const columns = [
  {
    title: 'Kvíz neve',
    dataIndex: 'quizName',
    key: 'quizName',
    align: 'center',
  },
  {
    title: 'Eredmény',
    dataIndex: 'result',
    key: 'result',
    align: 'center',
  },
]

function ResultsScene() {
  const { user, status } = useSelector((state) => state.auth)
  const { userScore } = useSelector((state) => state.user)
  const usersScoreIsLoading = status === FetchStatus.LOADING
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserResults(user?._id))
  }, [dispatch, user])

  const getUserTotalScores = () => {
    let scores = 0

    userScore.forEach((result) => {
      scores += result.result
    })

    return scores
  }

  return (
    <Scene title="Eredményeim">
      {userScore?.length < 1 && (
        <div>Itt láthatóak majd a kitöltött kvíz eredmények</div>
      )}
      {userScore?.length > 0 && (
        <div className="summ-results">
          Az általam eddig elért összpontszám:{' '}
          <span className="summ-value">
            <b>{getUserTotalScores()}</b>
          </span>
        </div>
      )}
      <Skeleton loading={usersScoreIsLoading}>
        <Table
          rowKey="_id"
          dataSource={userScore}
          columns={columns}
          pagination={false}
          className="results-table"
        />
      </Skeleton>
    </Scene>
  )
}

export default ResultsScene
