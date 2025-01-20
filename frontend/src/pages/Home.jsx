import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import '../App.css';
import React, { useEffect, useState } from 'react';
import { getNowPlaying, searchMovies } from "../services/api";
import MovieCard from '../components/MovieCard';

function Home() {

  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let response = await getNowPlaying();
        setMovies(response);
      }
      catch (error) {
        console.log(error);
        setError("Failed to fetch movies.");
      }
      finally {
        setLoading(false);
      }
    }
    fetchMovies();
  },[]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      if (!search) {
        const response = await getNowPlaying();
        setMovies(response);
      } else {
        const searchResults = await searchMovies(search);
        setMovies(searchResults);
      }
      setError(null);
    }
    catch (error) {
      console.log(error);
      setError("Failed to search movies...");
    }
    finally {
      setLoading(false);
    }
  }

  const MovieList = ({ movies, error, loading, search }) => {
    return (
      <>
        {error && <div>{error}</div>}
        {loading ? ( <div>Loading...</div> ) :
          <div className="MovieList">
            {movies
              .filter((movie) => movie.title.toLowerCase().startsWith(search.toLowerCase()))
              .map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))
            }
          </div>
        }
      </>
    )
  };

  return (
    <div className='container-fluid' style={{ backgroundColor: '#181A1B' }}>
      <form onSubmit={handleSearch} className="m-auto">
        <div className="row justify-content-center align-items-center p-5 pb-0">
          <div className="col-12 col-md-8 col-lg-6 mb-3 mb-md-0 me-lg-3">
            <input 
              type="text" 
              placeholder="Search for a movie title..." 
              value={search} 
              id="search" 
              onChange={(e) => setSearch(e.target.value)} 
              className="form-control custom-input"
            />
          </div>
          <div className="col-12 col-md-4 col-lg-2 ms-lg-3">
            <button type="submit" className="btn w-100 submit-btn">Search</button>
          </div>
        </div>
      </form>
      <MovieList movies={movies} error={error} loading={loading} search={search} />
    </div>
  )
}

export default Home;