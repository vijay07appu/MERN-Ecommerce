import Header from './components/header/Header.jsx'
import MainPage from './components/mainPage/MainPage.jsx'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { DataProvider } from './GlobalState.jsx'
function App() {


  return (
    <DataProvider>


      <Router>
        <div className='App'>
          <Header />
          <MainPage/>

        </div>

      </Router>
    </DataProvider>
  )
}

export default App
