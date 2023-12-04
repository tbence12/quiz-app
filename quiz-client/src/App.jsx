import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import { ErrorBoundary } from './components/ErrorBoundary'
import ViewportProvider from './context/ViewportProvider'
import FallbackLayout from './layouts/FallbackLayout/FallbackLayout'
import MainLayout from './layouts/MainLayout/MainLayout'
import './App.scss'

const GameLayout = lazy(() => import('./layouts/GameLayout/GameLayout'))
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ErrorBoundary>
          <ViewportProvider>
            <ConfigProvider
              theme={{
                components: {
                  Table: {
                    colorBgContainer: '#334454a0',
                    colorText: '#fff',
                    borderColor: '#d9a5204d',
                    headerBg: '#33445480',
                    headerColor: '#Daa520',
                    headerSplitColor: '#Daa520',
                    rowHoverBg: '#00152970',
                  },
                  Tabs: {
                    colorText: '#Daa520de',
                    colorPrimary: '#4096ff',
                    colorPrimaryActive: '#4096ff',
                  },
                },
              }}
            >
              <Suspense fallback={<FallbackLayout />}>
                <Routes>
                  <Route path="/game/:quizId" element={<GameLayout />} />
                  <Route path="/game" element={<Navigate replace to="/" />} />
                  <Route path="/*" element={<MainLayout />} />
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
