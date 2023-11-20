import { useNavigate } from 'react-router-dom'
// import { QuizCard } from '../../components/QuizCard'
import { SceneLayout } from '../../layouts/SceneLayout'
import quizzes from '../../mocks/quizzes'

function QuizScene() {
  const navigate = useNavigate()

  const goToQuiz = (quizId) => {
    // eslint-disable-next-line no-console
    navigate(`/game/${quizId}`)
  }
  const quizCardItems = quizzes.map((quiz) => (
    // eslint-disable-next-line no-underscore-dangle, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div key={quiz._id} onClick={() => goToQuiz(quiz._id)}>
      {quiz.name}
    </div>
  ))
  // const quizCardItems = quizzes.map((quiz) => (
  //   <QuizCard quizTitle={quiz.name} questionIds={quiz.questionIds} />
  // ))
  return (
    <SceneLayout title="Kvíz lista">
      <div>{quizCardItems}</div>
    </SceneLayout>
  )
}

export default QuizScene
