import PropTypes from 'prop-types'
import './SceneLayout.scss'

function SceneLayout({ title, children }) {
  return (
    <div className="scene">
      <div className="scene-title">{title}</div>
      <div className="scene-children">{children}</div>
    </div>
  )
}

SceneLayout.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default SceneLayout
