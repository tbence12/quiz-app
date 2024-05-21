import { Spin } from 'antd'
import { Scene } from '../../components/Scene'

function FallbackScene() {
  return (
    <Scene title="Betöltés...">
      <Spin />
    </Scene>
  )
}

export default FallbackScene
