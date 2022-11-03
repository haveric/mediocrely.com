import React from 'react';
import { Routes, Route } from 'react-router-dom';
import {HomePage} from './components/HomePage';
import EventPageWithRouter from "./components/EventPage";
import './App.scss';

const App = () => (
  <Routes>
    <Route path="/" element={<HomePage/>} />
    <Route path="/event/:id" element={<EventPageWithRouter/>} />
  </Routes>
);

export default App;
