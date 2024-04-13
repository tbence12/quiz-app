/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import { Button, message, Steps, Col, Row } from 'antd'
import PropTypes from 'prop-types'
import { Scene } from '../../components/Scene'
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
  const [current, setCurrent] = useState(0)
  const [nextButtonAvailable, setNextButtonAvailable] = useState(false)
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [selectedClass, setSelectedClass] = useState(DEFAULT_SELECTED_CLASS)

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

  const done = () => {
    message.success('Quiz completed!')
    const savableQuiz = {
      answers: userAnswers,
      result: userPoints,
      quizId: quiz._id,
      userId: '',
    }

    console.log('savableQuiz: ', savableQuiz)
  }

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }))

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
