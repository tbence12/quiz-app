/* eslint-disable react/no-unstable-nested-components */
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Skeleton, Table } from 'antd'
import { getQuestions } from '../../../../app/slicers/questionSlice'
import './QuestionsTab.scss'

const columns = [
  {
    title: 'Kérdés szövege',
    dataIndex: 'text',
    key: 'text',
    align: 'center',
  },
  {
    title: 'Kategória',
    dataIndex: 'categories',
    key: '_id',
    align: 'center',
    width: 150,
    render: (item) => item[0]?.name,
  },
]

function QuestionsTab() {
  const { questions, loading } = useSelector((state) => state.question)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!questions.length) {
      dispatch(getQuestions())
    }
  }, [questions, dispatch])

  return (
    <Skeleton loading={loading}>
      <Table
        rowKey="_id"
        dataSource={questions}
        columns={columns}
        expandable={{
          expandedRowRender: (record) =>
            record.answers.map((answer) => {
              return (
                <p
                  style={{
                    margin: 0,
                    paddingLeft: '50px',
                    paddingRight: '150px',
                    background: '#0015291a',
                    color: answer.correct ? '#00eb00' : 'white',
                  }}
                  key={answer.number}
                >
                  {answer.text}
                </p>
              )
            }),
        }}
        pagination={false}
        className="questions-tab"
      />
    </Skeleton>
  )
}

export default QuestionsTab
