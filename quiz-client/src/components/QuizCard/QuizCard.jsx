import PropTypes from 'prop-types'
import { Card } from 'antd'

function QuizCard({ quizTitle, questionIds }) {
  const questionIdItems = questionIds.map((questionId) => <li>{questionId}</li>)
  return (
    <Card title={quizTitle} bordered={false} style={{ width: 300 }}>
      <p>Kérdés ID-k:</p>
      <ul>{questionIdItems}</ul>
    </Card>
  )
}

QuizCard.propTypes = {
  quizTitle: PropTypes.string.isRequired,
  questionIds: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default QuizCard
