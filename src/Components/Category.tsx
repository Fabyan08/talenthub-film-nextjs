import React, { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

interface CategoryProps {
  genres: { [key: number]: string };
  onGenreSelect: (genreId: any | null) => void;
  selectedGenreId: number | null;
}

const Category: FC<CategoryProps> = ({
  genres,
  onGenreSelect,
  selectedGenreId,
}) => {
  return (
    <div className="wrapper">
      <h1 className="font-bold text-xl text-white mt-4">Browse by Category</h1>
      <div className="mt-4">
        <Swiper
          spaceBetween={2} // Adjust the spacing between slides
          breakpoints={{
            640: {
              slidesPerView: "auto", // Set slidesPerView to 'auto' for mobile devices
              spaceBetween: 20, // Adjust spacing to fit approximately 3.5 slides per view
            },
            1024: {
              slidesPerView: 6.5, // Adjusted for desktop devices
            },
          }}
        >
          <SwiperSlide>
            <li
              className={`text-white text-center text-xl font-semibold hover:text-white hover:bg-primary p-2 rounded-full ${
                selectedGenreId === null ? "bg-primary text-white" : ""
              }`}
            >
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onGenreSelect(null);
                }}
              >
                All
              </a>
            </li>
          </SwiperSlide>
          {/* Slides for individual genres */}
          {Object.entries(genres).map(([genreId, genreName]) => (
            <SwiperSlide key={genreId}>
              <li
                className={`text-white text-center text-xl font-semibold hover:text-white hover:bg-primary p-2 rounded-full ${
                  selectedGenreId === Number(genreId)
                    ? "bg-primary text-white"
                    : ""
                }`}
              >
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onGenreSelect(Number(genreId));
                  }}
                >
                  {genreName}
                </a>
              </li>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Category;
