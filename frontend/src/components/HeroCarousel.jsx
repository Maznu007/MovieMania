import { useEffect, useState } from "react";
import Slider from "react-slick";
import { getTrendingMovies } from "../services/api";
import "../css/HeroCarousel.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function HeroCarousel() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const data = await getTrendingMovies();
        setMovies(data.slice(0, 5)); //top 5
      } catch (err) {
        console.error(err);
      }
    };

    fetchTrending();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="hero-carousel">
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id}>
            <div
              className="carousel-slide"
              style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
              }}
            >
              <div className="carousel-content">
                <h2 className="carousel-title">{movie.title}</h2>
                <p className="carousel-overview">{movie.overview}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default HeroCarousel;
