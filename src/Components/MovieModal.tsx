import axios from "axios";
import { useEffect, useState } from "react";

interface Movie {
  title: string;
  overview: string;
  // Add other properties you need
}

interface MovieModalProps {
  movieId: number;
  onClose: () => void;
}

const MovieModal = ({ movieId, onClose }: MovieModalProps) => {
  const [movieDetail, setMovieDetail] = useState<Movie | null>(null);

  // Fetch movie details when the modal is opened
  useEffect(() => {
    // Fetch movie details using movieId
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=f8d0dccf140f8bb785d7d9b067b28ce3`
      )
      .then((response) => {
        setMovieDetail(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie details: ", error);
      });
  }, [movieId]);

  return (
    <div className="fixed px-4 inset-0 bg-black/20 backdrop-blur-sm overflow-y-auto flex items-center justify-center z-50">
      <div className="bg-white text-slate-950 rounded-lg p-8 max-w-md w-full">
        {movieDetail && (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{movieDetail.title}</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={onClose}
              >
                X
              </button>
            </div>
            <p>{movieDetail.overview}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieModal;
