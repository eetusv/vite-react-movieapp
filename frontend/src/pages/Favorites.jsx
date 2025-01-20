import '../App.css';
import { useMovieContext } from '../contexts/MovieContext';
import MovieCard from '../components/MovieCard';

function Favorites() {
    const { favorites } = useMovieContext();
  
    if (favorites.length > 0) {
      return (
        <div className="favorites">
          <h2 className='m-0 p-2 text-center'>Your Favorites</h2>
          <div className="MovieList">
            {favorites.map((movie) => (
              <MovieCard movie={movie} key={movie.id} />
            ))}
          </div>
        </div>
      );
    }
  
    return (
      <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites!</p>
      </div>
    );
  }
  
  export default Favorites;