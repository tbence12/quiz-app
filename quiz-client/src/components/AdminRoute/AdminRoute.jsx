import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { FallbackScene } from '../../scenes/FallbackScene'
import { NotAuthorizedScene } from '../../scenes/NotAuthorizedScene'

function AdminRoute() {
  const { user, loading } = useSelector((state) => state.auth)

  if (loading) {
    return <FallbackScene />
  }

  return user?.isAdmin ? <Outlet /> : <NotAuthorizedScene />
}

export default AdminRoute
