import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ListPage from './ListPage'; 
import SavedListsPage from './SavedListsPage'; 
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/list/:id" element={<ListPage />} />
      <Route path="/lists" element={<SavedListsPage />} /> 
    </Routes>
  );
}

export default App;