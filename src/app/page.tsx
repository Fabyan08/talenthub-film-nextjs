"use client";
import Image from "next/image";
import Link from "next/link";
import { CiSearch } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

import groot from "../../public/groot.jpg";
import guardian from "../../public/guardian.jpg";
import guardian2 from "../../public/guardian2.jpg";
import { LuMoveUpRight } from "react-icons/lu";
import Category from "@/Components/Category";

import { useState, useEffect } from "react";
import axios from "axios";
import Paginations from "@/Components/Pagination";
import MovieModal from "@/Components/MovieModal";

import { FaHome } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";
import { FaRegPaperPlane } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";

interface Movie {
  id: number;
  title: string;
  genre_ids: number[];
  [key: string]: any; // To handle additional properties
}

interface MovieResponse {
  results: Movie[];
  [key: string]: any; // To handle additional properties
}

interface GenreResponse {
  genres: { id: number; name: string }[];
}

interface GenreMap {
  [key: number]: string;
}

const Home: React.FC = () => {
  const [movie, setMovie] = useState<MovieResponse>({ results: [] });
  const [genres, setGenres] = useState<GenreMap>({});
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedGenreId, setSelectedGenreId] = useState<number | null>(null);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const searchMovies = () => {
    const genreParam = selectedGenreId ? `&with_genres=${selectedGenreId}` : "";
    axios
      .get<MovieResponse>(
        `https://api.themoviedb.org/3/search/movie?api_key=f8d0dccf140f8bb785d7d9b067b28ce3&query=${searchQuery}${genreParam}`
      )
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie data: ", error);
      });
  };

  const handleGenreSelect = (genreId: number) => {
    setSelectedGenreId(genreId);
    setCurrentPage(1);
  };

  useEffect(() => {
    // Fetch genre data
    axios
      .get<GenreResponse>(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=f8d0dccf140f8bb785d7d9b067b28ce3"
      )
      .then((response) => {
        const genreData = response.data.genres;
        const genreObject: GenreMap = {};
        genreData.forEach((genre) => {
          genreObject[genre.id] = genre.name;
        });
        setGenres(genreObject);
      })
      .catch((error) => {
        console.error("Error fetching genre data: ", error);
      });

    const genreParam = selectedGenreId ? `&with_genres=${selectedGenreId}` : "";
    axios
      .get<MovieResponse>(
        `https://api.themoviedb.org/3/discover/movie?api_key=f8d0dccf140f8bb785d7d9b067b28ce3&page=${currentPage}${genreParam}`
      )
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie data: ", error);
      });
  }, [currentPage, selectedGenreId]);

  const mapGenreNames = (genreIds: number[]): string[] => {
    return genreIds.map((genreId) => {
      const genreName = genres[genreId] || "Unknown Genre";
      return genreName;
    });
  };

  const [selectedMovieId, setSelectedMovieId] = useState(null);

  const handleMovieClick = (movieId: any) => {
    setSelectedMovieId(movieId);
  };

  const handleCloseModal = () => {
    setSelectedMovieId(null);
  };

  return (
    <>
      {selectedMovieId && (
        <MovieModal movieId={selectedMovieId} onClose={handleCloseModal} />
      )}
      <main>
        <header className="bg-main2 bg-cover bg-center w-full h-fit pb-10 md:h-screen relative">
          <div className="flex w-full justify-center">
            <nav className="fixed z-20 md:hidden bottom-4 px-10 justify-between text-3xl text-white  flex items-center bg-slate-800/40 backdrop-blur-md h-20 rounded-full w-[90%] border-2 border-white">
              <FaHome className="hover:text-primary duration-150 " />
              <MdLocalMovies className="hover:text-primary duration-150 " />
              <FaRegPaperPlane className="hover:text-primary duration-150 " />
              <FaBookmark className="hover:text-primary duration-150 " />
            </nav>
          </div>
          <div className="wrapper">
            <nav className="hidden md:flex pb-10 justify-between items-end text-white">
              <Link href="/" className="font-bold text-white text-3xl">
                Film <span className="text-primary">Keren</span>
              </Link>
              <ul className="flex gap-10 items-end">
                <li className="flex flex-col gap-10 items-center">
                  <hr className="border-2 border-primary w-14" />
                  <Link href="/">Home</Link>
                </li>

                <li>
                  <Link href="/">Movies</Link>
                </li>
                <li>
                  <Link href="/">Blog</Link>
                </li>
                <li>
                  <Link href="/">My List</Link>
                </li>
              </ul>

              <div className="relative">
                <CiSearch className="text-white z-20 font-bold text-2xl rounded-xl absolute left-2 top-1/2 transform -translate-y-1/2" />

                <input
                  type="text"
                  className=" w-80 p-2 pl-14 bg-white/20 backdrop-blur-md focus:outline-none rounded-xl text-white   duration-150 placeholder:text-slate-300 placeholder:text-sm"
                  placeholder="Search For Movie..."
                />
              </div>
              <div className="w-10 h-10 text-xl font-bold rounded-full bg-primary flex justify-center items-center">
                F
              </div>
            </nav>
            <div className="flex flex-col md:flex-row items-start justify-between">
              <div className="mt-10 md:mt-32  text-white  ">
                <h1 className="text-4xl md:text-6xl font-bold">
                  Guardians Of The <br /> Galaxy Vol. 5
                </h1>
                <div className="flex mt-6 gap-4">
                  <h1>Coming Soon</h1>
                  <h1>|</h1>
                  <h1>Wednesday, Jun 3rd, 2025</h1>
                </div>
                <div className="mt-10 flex gap-10">
                  <button className="bg-primary animate-bounce text-white px-6 py-4 rounded-full hover:scale-90 duration-150 flex items-center justify-center gap-2">
                    <FaPlay />
                    <h1>Watch Trailer</h1>
                  </button>
                  <button className="bg-white text-primary px-6 py-4 rounded-full hover:scale-90 duration-150 flex items-center justify-center gap-2">
                    <AiOutlinePlus />
                    <h1>Add To My List</h1>
                  </button>
                </div>
              </div>
              <div className="flex  flex-col gap-4">
                <div className="flex flex-col gap-2 text-white">
                  <div className="text-white flex gap-2 items-center">
                    <div className="bg-primary rounded-full w-4 h-4"></div>
                    <a
                      href="#"
                      className="flex hover:underline duration-150 hover:scale-90 gap-2 items-centr"
                    >
                      MEN IN BLACK <LuMoveUpRight />
                    </a>
                  </div>
                  <p className="md:w-64 text-sm text-slate-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
                    dignissimos!
                  </p>
                </div>
                <div className="flex flex-col gap-2 text-white">
                  <div className="text-white flex gap-2 items-center">
                    <div className="bg-primary rounded-full w-4 h-4"></div>
                    <a
                      href="#"
                      className="flex hover:underline duration-150 hover:scale-90 gap-2 items-centr"
                    >
                      Interstellar 2 <LuMoveUpRight />
                    </a>
                  </div>
                  <p className="md:w-64 text-sm text-slate-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut,
                    dignissimos!
                  </p>
                </div>
                <Image
                  src={guardian}
                  alt="Guardian"
                  className="md:w-60 hover:scale-105 duration-150 rounded-md object-cover object-center h-40"
                />
                <Image
                  src={guardian2}
                  alt="Guardian"
                  className="md:w-60 hover:scale-105 duration-150 rounded-md object-cover object-center h-40"
                />
              </div>
            </div>
          </div>

          <div className="absolute hidden md:block bottom-0 left-0 bg-second/60 w-[70%] h-60 rounded-tr-[10rem]">
            <div className="grid grid-cols-2 gap-4 text-white justify-between px-20 pt-6">
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">CATEGORY</h1>
                <p>Fantasy, Hi-fi</p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">STORYLINE</h1>
                <p className="text-sm">
                  History. The Guardians of the Galaxys origins can be traced to
                  Earth native Peter Quill, AKA Star-Lord, betraying Yondu
                  Udontu and his Ravagers and pre-emptively stealing a valuable
                  Orb they were after.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">DIRECTOR / WRITER</h1>
                <p className="text-md">James Gunn</p>
              </div>
              <div className="flex flex-col gap-2">
                <h1 className="font-bold">STARS</h1>
                <p className="text-sm">
                  Vin Diesel, Chris Pratt, Karen Gillan, Bradley Cooper, James
                  Gunn, Sean Gunn...
                </p>
              </div>
            </div>
          </div>
        </header>
        <section
          id="genre"
          className="bg-second w-full h-fit pb-16 text-white pt-10"
        >
          <div className="flex justify-center">
            <div className=" w-fit px-6 py-4 text-white border-l-2 border-t-2 rounded-full">
              Genre
            </div>
          </div>

          <div className="wrapper">
            <Category
              genres={genres}
              onGenreSelect={handleGenreSelect}
              selectedGenreId={selectedGenreId}
            />
          </div>

          <div className="wrapper mt-10">
            <div className="mt-10">
              <ul className="grid grid-cols-2 md:grid-cols-5 gap-3 md:px-10">
                {movie.results &&
                  movie.results.length > 0 &&
                  movie.results.map((castMember, index) => (
                    <li
                      key={index}
                      className="bg-white hover:bg-second hover:text-white duration-150 hover:scale-95 hover:border-2 hover:border-white rounded-md text-second text-center flex justify-start gap-4 items-center flex-col p-2"
                    >
                      <div>
                        <Link
                          href="#"
                          onClick={() => handleMovieClick(castMember.id)}
                          className="cursor-pointer"
                        >
                          {" "}
                          <Image
                            src={
                              "https://image.tmdb.org/t/p/w500" +
                              castMember.poster_path
                            }
                            width={300}
                            height={300}
                            className="rounded-xl w-60 h-60 md:h-80 object-cover object-center"
                            alt="Movie Poster"
                          />
                        </Link>
                      </div>
                      <p>{castMember.title}</p>
                      <p className="font-bold">
                        {mapGenreNames(castMember.genre_ids).join(", ")}
                      </p>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="wrapper">
            <Paginations
              currentPage={currentPage}
              totalPages={movie.total_pages}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
      </main>
    </>
  );
};
export default Home;
