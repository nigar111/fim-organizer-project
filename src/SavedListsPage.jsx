import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const SavedListsPage = () => {
  const [savedLists, setSavedLists] = useState([]);

  useEffect(() => {
    const lists = JSON.parse(localStorage.getItem('myFavoriteLists')) || [];
    setSavedLists(lists);
  }, []);

  const deleteList = (id) => {
    const updatedLists = savedLists.filter(list => list.id !== id);
    setSavedLists(updatedLists);
    localStorage.setItem('myFavoriteLists', JSON.stringify(updatedLists));
  };

  return (
    <div className="saved-lists-page">
      <header className="header-bar">
        <h1>Movie</h1>
      </header>
      
      <div className="lists-container">
        {savedLists.length === 0 ? (
          <p style={{textAlign: 'center'}}>There are no favorite movies yet!</p>
        ) : (
          savedLists.map(list => (
            <div key={list.id} className="saved-list-box">
               <h2 className="saved-list-title">{list.title}</h2>
               <button className="delete-list-btn" onClick={() => deleteList(list.id)}>x</button>
               <ul className="saved-list-ul">
                 {list.movies.map(movie => (
                   <li key={movie.imdbID} className="saved-list-li">
                     <span>{movie.Title}</span>
                     <a 
                       href={`https://www.imdb.com/title/${movie.imdbID}/`} 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       className="imdb-btn"
                     >
                       IMDB
                     </a>
                   </li>
                 ))}
               </ul>
            </div>
          ))
        )}
      </div>
      
      <div style={{textAlign: 'center', marginTop: '30px'}}>
          <Link to="/" className="back-to-movies-btn">Back to Movies</Link>
      </div>
    </div>
  );
};

export default SavedListsPage;