import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { ConfigProvider } from 'antd'
import { ErrorBoundary } from './components/ErrorBoundary'
import { PrivateRoute } from './components/PrivateRoute'
import ViewportProvider from './context/ViewportProvider'
import { FallbackLayout, LoginLayout, MainLayout } from './layouts'
import { theme } from './theme'
import { getUserStatus } from './app/slicers/authSlice'
import './App.scss'

const GameLayout = lazy(() => import('./layouts/GameLayout/GameLayout'))
function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem('user')) {
      dispatch(getUserStatus())
    }
  }, [dispatch])

  return (
    <div className="App">
      <BrowserRouter>
        <ErrorBoundary>
          <ViewportProvider>
            <ConfigProvider theme={theme}>
              <Suspense fallback={<FallbackLayout />}>
                <Routes>
                  <Route path="/login" element={<LoginLayout />} />
                  <Route
                    path="/register"
                    element={<LoginLayout login={false} />}
                  />
                  <Route path="/logout" element={<LoginLayout logout />} />
                  <Route path="/game/:quizId" element={<GameLayout />} />
                  <Route path="/game" element={<Navigate replace to="/" />} />
                  <Route path="/" element={<PrivateRoute />}>
                    <Route path="/*" element={<MainLayout />} />
                  </Route>
                </Routes>
              </Suspense>
            </ConfigProvider>
          </ViewportProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  )
}

export default App
