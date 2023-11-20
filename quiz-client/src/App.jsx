import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ErrorBoundary } from './components/ErrorBoundary'
import ViewportProvider from './context/ViewportProvider'
import './App.scss'

const MainLayout = lazy(() => import('./layouts/MainLayout/MainLayout'))
const GameLayout = lazy(() => import('./layouts/GameLayout/GameLayout'))
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ErrorBoundary>
          <ViewportProvider>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/game/:quizId" element={<GameLayout />} />
                <Route path="/game" element={<Navigate replace to="/" />} />
                <Route path="/*" element={<MainLayout />} />
              </Routes>
            </Suspense>
          </ViewportProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  )
}

export default App
