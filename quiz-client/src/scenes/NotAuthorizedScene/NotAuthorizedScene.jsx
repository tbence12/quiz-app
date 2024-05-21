import { Scene } from '../../components/Scene'

function NotAuthorizedScene() {
  return (
    <Scene title="Admin terület!">
      <span>A keresett oldal megtekitéséhez nincsen jogosultságod</span>
    </Scene>
  )
}

export default NotAuthorizedScene
