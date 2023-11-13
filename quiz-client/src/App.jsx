import ViewportProvider from './context/ViewportProvider'
import { MainLayout } from './layouts/MainLayout'
import './App.scss'

function App() {
  return (
    <div className="App">
      <ViewportProvider>
        <MainLayout />
      </ViewportProvider>
    </div>
  )
}

export default App
