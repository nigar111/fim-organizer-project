import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './App.css';

const ListPage = () => {
  const { id } = useParams(); 
  const [listName, setListName] = useState('Loading...');
  const [movies, setMovies] = useState([]);
  
  const API_KEY = 'c4f13a05';

  useEffect(() => {
    const fetchListAndMovies = async () => {
      try {
        const resList = await fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`);
        const listData = await resList.json();
        
        if (listData && listData.title) {
           setListName(listData.title);
        }

        if (listData && listData.movies) {
            const moviePromises = listData.movies.map(imdbID =>
              fetch(`http://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`)
                .then(res => res.json())
            );
            const moviesData = await Promise.all(moviePromises);
            setMovies(moviesData);
        }
      } catch (error) {
        console.error("List fetch error:", error);
        setListName('List not found or error occurred');
      }
    };

    fetchListAndMovies();
  }, [id]);

  return (
    <div className="list-page">
      <h1 className="list-title">{listName}</h1>
      <div className="saved-movies-container">
        {movies.map(movie => (
          <div key={movie.imdbID} className="saved-movie-card">
            <div className="saved-movie-info">
               <span className="saved-movie-title">{movie.Title} ({movie.Year})</span>
               <a 
                 href={`https://www.imdb.com/title/${movie.imdbID}/`} 
                 target="_blank" 
                 rel="noopener noreferrer" 
                 className="imdb-link"
               >
                 IMDB
               </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListPage;