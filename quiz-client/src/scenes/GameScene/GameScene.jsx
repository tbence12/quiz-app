// import { useState } from 'react'
import PropTypes from 'prop-types'
import { Scene } from '../../components/Scene'

function GameScene({ quizId }) {
  return (
    <Scene title={`Kvíz neve, ${quizId}`}>
      <span>A keresett kvíz nem található</span>
    </Scene>
  )
}

GameScene.propTypes = {
  quizId: PropTypes.string.isRequired,
}

export default GameScene
