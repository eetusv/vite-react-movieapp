import '../App.css';
import React, { useEffect, useState } from 'react';
import { getMovieDetails } from '../services/api';
import { useMovieContext } from '../contexts/MovieContext';

function MovieCard(props) {
  const [movie, setMovie] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const { isFavorite, addFavorite, removeFavorite } = useMovieContext();

  const favorite = isFavorite(props.movie.id);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        let details = await getMovieDetails(props.movie.id);
        setMovie(details);
      } 
      catch (error) {
        console.error(error);
        setError("Error fetching movie details")
      }
      finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [props.movie.id]);

  let genres = null;  
  if (movie?.genres?.length) {
    genres = movie.genres.map(genre => genre.name).join(", ");
  }

  function onFavoriteClick(e) {
    e.preventDefault();
    if (favorite) {
      removeFavorite(props.movie.id);
    } else {
      addFavorite(props.movie);
    }
  }

  return (
      <div className='MovieCard mt-5 mb-5'>
        <div className="movie-poster">
          <img src={"https://image.tmdb.org/t/p/w780" + props.movie.poster_path} alt={`Poster of ${props.movie.title}`} />
            <div className="movie-overlay d-flex justify-content-end align-items-start">
                <button className={`favorite-btn ${favorite ? "active":""}`} onClick={onFavoriteClick}>&#10084;</button>
            </div>
        </div>

        <div className="container mt-3">
          <div className="row text-start">
            <div className="col-12">
              <h2 className="MovieTitle">{props.movie.title}</h2>
            </div>
          </div>

          <div className="row text-start">
            <div className="col">
              <p>{props.movie.release_date}</p>
            </div>
          </div>

          <div className="row text-start">
            <div className="col">
              <p>{props.movie.overview}</p>
            </div>
          </div>

          <div className="row text-start">
            <div className="col">
              <span className="GenresText">{genres}</span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default MovieCard;