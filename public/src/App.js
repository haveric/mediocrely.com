import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {Home} from './components/Home';
import './App.scss';

const App = () => (
  <Routes>
    <Route path="/" element={<Home/>} />
  </Routes>
);

export default App;
