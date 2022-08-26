import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom";
// import './App.css'

import MainPage from './pages/mainPage/mainPage';

function App() {
  const [display, setDisplay] = useState("hello")

  // useEffect(() => {
  //   fetch('http://localhost:8080/jobs')
  //   .then(res => res.json())
  //   .then(resp => setDisplay(resp.message))
  // }, [])


  return (
    <MainPage />
  )
}

export default App
