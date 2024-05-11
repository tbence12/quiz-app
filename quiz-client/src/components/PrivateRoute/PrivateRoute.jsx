import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { FallbackLayout } from '../../layouts'

function PrivateRoute() {
  const { user, loading } = useSelector((state) => state.auth)
  console.log(user)
  console.log('loading: ', loading)

  if (loading) {
    return <FallbackLayout />
  }

  return user ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
