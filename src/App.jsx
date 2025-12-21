import './App.css'
import Header from './components/header.jsx'
import ProductCard from './components/productCard.jsx'
import Test from './components/test.jsx'
import HomePage from './pages/homePage.jsx'
import LoginPage from './pages/loginPage.jsx'
import RegisterPage from './pages/registerPage.jsx'
import AdminPage from './pages/adminPage.jsx'
import { Routes, Route, BrowserRouter } from 'react-router-dom'

function App() {

  return (

    <BrowserRouter>
    <div className="w-full h-screen bg-primary text-secondary">
     
      <Routes path="/">
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPage />} />

      </Routes> 

    </div>
    </BrowserRouter>
  )

}

export default App
