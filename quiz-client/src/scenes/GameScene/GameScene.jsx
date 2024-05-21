/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, message, Steps, Col, Row } from 'antd'
import PropTypes from 'prop-types'
import { Scene } from '../../components/Scene'
import Result from '../../app/apiCall/Result'
import './GameScene.scss'

const POINTS_PER_CORRECT_ANSWER = 100
const DEFAULT_SELECTED_CLASS = 'selected-button'
const CORRECT_SELECTED_CLASS = 'correct-selected-button'
const INCORRECT_SELECTED_CLASS = 'incorrect-selected-button'

const userAnswers = []
let userPoints = 0

function QuestionContainer({ question, selected, select, selectedClass }) {
  const answerItems = question.answers.map((answer) => {
    return (
      <React.Fragment key={answer._id}>
        <Col xs={24} md={12} xxl={6}>
          <Button
            className={`answer-button ${
              selected === answer.number && selectedClass
            } ${selected && selected !== answer.number && 'disabled-button'}`}
            onClick={() => select(answer)}
            disabled={selected}
          >
            {answer.text}
          </Button>
        </Col>
      </React.Fragment>
    )
  })

  return (
    <>
      <h2>{question.text}</h2>
      <Row key={question._id}>{answerItems}</Row>
    </>
  )
}

function GameScene({ quiz }) {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.auth)
  const [current, setCurrent] = useState(0)
  const [nextButtonAvailable, setNextButtonAvailable] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [selectedClass, setSelectedClass] = useState(DEFAULT_SELECTED_CLASS)
  const [isDone, setIsDone] = useState(false)

  const putAnswerIntoUserAnswers = (answer) => {
    const questionId = quiz.questions[current]._id
    if (
      !userAnswers.some((userAnswer) => userAnswer.questionId === questionId)
    ) {
      const { correct, number } = answer
      if (correct) {
        userPoints += POINTS_PER_CORRECT_ANSWER
      }
      userAnswers.push({
        answerNumber: number,
        correct,
        questionId,
      })
    }
  }

  const checkAnswer = (correct) => {
    const isCorrectSelectedClass = correct
      ? CORRECT_SELECTED_CLASS
      : INCORRECT_SELECTED_CLASS
    setSelectedClass(isCorrectSelectedClass)
    setNextButtonAvailable(true)
  }

  const selectThenCheckAnser = (answer) => {
    setSelectedAnswer(answer.number)
    putAnswerIntoUserAnswers(answer)
    setTimeout(() => checkAnswer(answer.correct), 2000)
  }

  const steps = quiz.questions.map((question) => {
    return {
      content: (
        <QuestionContainer
          question={question}
          selected={selectedAnswer}
          select={selectThenCheckAnser}
          selectedClass={selectedClass}
        />
      ),
      status: 'wait',
    }
  })

  const next = () => {
    setCurrent(current + 1)
    setNextButtonAvailable(false)
    setSelectedAnswer(null)
    setSelectedClass(DEFAULT_SELECTED_CLASS)
  }

  const done = async () => {
    message.success('Quiz completed!')

    const userId = user?._id

    const savableQuizResult = {
      answers: userAnswers,
      result: userPoints,
      quizId: quiz._id,
      userId,
    }

    if (userId) {
      await Result.addNewResult(savableQuizResult)
    }

    setIsDone(true)
  }

  const goToQuizzes = () => {
    navigate('/quizzes')
  }

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))

  if (isDone) {
    return (
      <Scene title={quiz.name}>
        <div className="result-label">
          Gratulálunk {user?.username ?? ''}!
          <br />
          Eredményed:
          <span className="result-score"> {userPoints} pont</span>
        </div>
        <Button type="primary" onClick={() => goToQuizzes()}>
          Vissza a kvízekhez
        </Button>
      </Scene>
    )
  }

  return (
    <Scene title={quiz.name}>
      <>
        <Steps className="steps" current={current} items={items} />
        <div className="game-step-content">{steps[current].content}</div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current < steps.length - 1 && (
            <Button
              disabled={!nextButtonAvailable}
              type={nextButtonAvailable ? 'primary' : 'link'}
              onClick={() => next()}
            >
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              disabled={!nextButtonAvailable}
              type={nextButtonAvailable ? 'primary' : 'link'}
              onClick={() => done()}
            >
              Done
            </Button>
          )}
        </div>
      </>
    </Scene>
  )
}

GameScene.propTypes = {
  quiz: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        answers: PropTypes.arrayOf(
          PropTypes.shape({
            _id: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            number: PropTypes.number.isRequired,
            correct: PropTypes.bool.isRequired,
          }),
        ).isRequired,
      }),
    ).isRequired,
  }).isRequired,
}

export default GameScene
