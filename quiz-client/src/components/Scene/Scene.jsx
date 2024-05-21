import PropTypes from 'prop-types'
import './Scene.scss'

function Scene({ title, children }) {
  return (
    <div className="scene">
      <div className="scene-title">{title}</div>
      <div className="scene-children">{children}</div>
    </div>
  )
}

Scene.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default Scene
