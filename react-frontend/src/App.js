import React from 'react'
import Category from './pages/Category'
import Products from './pages/Products'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './app.css'

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Products/>}/>
          <Route path='category' element={<Category/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App