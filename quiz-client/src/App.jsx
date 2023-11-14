import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/error/ErrorBoundary'
import ViewportProvider from './context/ViewportProvider'
import { MainLayout } from './layouts/MainLayout'
import './App.scss'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ErrorBoundary>
          <ViewportProvider>
            <MainLayout />
          </ViewportProvider>
        </ErrorBoundary>
      </BrowserRouter>
    </div>
  )
}

export default App
