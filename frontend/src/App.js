import React from 'react';
import Navbar from './components/Navbar'; 
import './App.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Home from './components/Home/Home'
import About from './components/About/About'
import Guide from './components/Guide/Guide'
import Footer from './components/Footer/Footer'; 
import MainPage from './components/WordAnalyzer/Mainpage'
import Analyzer from './components/Visualizer/MainPage2';
import Recommendation from './components/Recommendation/Recommendation'


function App() { 

  return ( 
    //Routing through all the components
    <Router> 
      <Navbar /> 
      <Routes> 
        <Route path='/' element={<Home />} /> 
        <Route path='/home' element={<Home/>} /> 
        <Route path='/about' element={<About />} /> 
        <Route path='/guide' element={<Guide />} /> 
        <Route path='/main' element={<MainPage />} />
        <Route path='/analyzer' element={<Analyzer />} />
        <Route path='/recommender' element={<Recommendation/>}/>
      </Routes> 
      <Footer />
    </Router> 
    
  ); 
} 

export default App; 
