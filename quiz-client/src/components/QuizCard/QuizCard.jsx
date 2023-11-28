import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

import './QuizCard.scss'

function QuizCard({ quizTitle, questionIds, onClick }) {
  const [style, setStyle] = useState({ display: 'none' })
  const numberOfQuestions = questionIds.length

  return (
    <div
      className="quiz-card"
      onMouseEnter={() => {
        setStyle({ display: 'block' })
      }}
      onMouseLeave={() => {
        setStyle({ display: 'none' })
      }}
    >
      <div className="quiz-card-header">
        <span>{quizTitle}</span>
      </div>
      <div className="quiz-card-body">
        <span>{numberOfQuestions} kérdés</span>
      </div>
      <div className="quiz-card-action">
        <Button type="primary" style={style} onClick={onClick}>
          Kvíz indítás
        </Button>
      </div>
    </div>
  )
}

QuizCard.propTypes = {
  quizTitle: PropTypes.string.isRequired,
  questionIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  onClick: PropTypes.func,
}

QuizCard.defaultProps = {
  onClick: () => {},
}

export default QuizCard
