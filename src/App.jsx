import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Servicios from './pages/Servicios';
import Especialidades from './pages/Especialidades';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<Servicios />} />
      <Route path="/especialidades" element={<Especialidades />} />
     
    </Routes>
  );
}

export default App;

