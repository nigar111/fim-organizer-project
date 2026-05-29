import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const MainPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [listTitle, setListTitle] = useState('');

  const API_KEY = 'c4f13a05';

  useEffect(() => {
    const fetchInitialMovies = async () => {
      const res = await fetch(`https://www.omdbapi.com/?s=Avengers&apikey=${API_KEY}`);
      const data = await res.json();
      if (data.Search) {
        setMovies(data.Search); 
      }
    };
    fetchInitialMovies();
  }, []); 
  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const res = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`);
    const data = await res.json();
    if (data.Search) setMovies(data.Search);
  };

  const addToFavorites = (movie) => {
    if (!favorites.some(f => f.imdbID === movie.imdbID)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(f => f.imdbID !== id));
  };

  const saveList = () => {
    if (!listTitle.trim() || favorites.length === 0) return;
    const newList = {
      id: Date.now().toString(),
      title: listTitle,
      movies: favorites
    };
    const existingLists = JSON.parse(localStorage.getItem('myFavoriteLists')) || [];
    localStorage.setItem('myFavoriteLists', JSON.stringify([...existingLists, newList]));
    setFavorites([]);
    setListTitle('');
  };

  return (
    <div className="main-page">
      <header className="header-bar">
        <h1>Movie</h1>
      </header>
      
      <div className="main-container">
        <div className="left-side">
          <form onSubmit={handleSearch} className="search-container">
            <input 
              className="search-input" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
              placeholder="Search" 
            />
            <button className="search-btn" type="submit">Search</button>
          </form>

          <div className="movies-list">
            {movies.map(movie => (
              <div key={movie.imdbID} className="movie-item">
                <img 
                  src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/140x200"} 
                  alt={movie.Title} 
                  className="movie-img" 
                />
                <div className="movie-info">
                  <h3 className="movie-title">{movie.Title}</h3>
                  <p className="movie-year">Year: {movie.Year}</p>
                  <button className="fav-btn" onClick={() => addToFavorites(movie)}>+ Favorite</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="right-side">
          <div className="favorites-box">
            <ul className="fav-list">
              {favorites.map(f => (
                <li key={f.imdbID} className="fav-list-item">
                  <span>{f.Title} ({f.Year})</span>
                  <button className="remove-btn" onClick={() => removeFavorite(f.imdbID)}>x</button>
                </li>
              ))}
            </ul>
            <input 
              className="list-name-input" 
              value={listTitle} 
              onChange={(e) => setListTitle(e.target.value)} 
              placeholder="Siyahının adı..." 
            />
            <button 
              className="save-list-btn" 
              onClick={saveList} 
              disabled={!listTitle || favorites.length === 0}
            >
              Add To Favorite List
            </button>
            <Link to="/lists" className="view-list-btn">Look At Favorite List</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;