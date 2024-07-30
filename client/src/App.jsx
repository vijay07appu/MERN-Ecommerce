import Header from './components/header/Header.jsx'
import MainPage from './components/mainPage/MainPage.jsx'
import { BrowserRouter as Router,Route } from 'react-router-dom'
function App() {


  return (
    <Router>
     <div className='App'>
     <Header/>
   
     </div>
      
    </Router>
  )
}

export default App
