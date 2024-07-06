import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SlickerProps {
  name?: string;
  alowMaxHeight?: boolean;
  desktopSlidesToShow: number;
  desktopSlidesToScroll: number;
  autoPlay?: boolean;
}

const Slicker = ({
  desktopSlidesToShow,
  desktopSlidesToScroll,
  alowMaxHeight,
  autoPlay,
}: SlickerProps) => {
  const _height = alowMaxHeight ? "h-96" : "h-32";
  const _autoPlay = autoPlay ? autoPlay : false;

  const settings = {
    dots: false,
    infinite: true,
    autoplay: _autoPlay,
    speed: 2000,
    slidesToShow: desktopSlidesToShow,
    slidesToScroll: desktopSlidesToScroll,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="slider-container py-3">
      <Slider {...settings}>
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div className={`${_height} px-3`} key={item}>
            <div
              className={`bg-center	bg-cover bg-no-repeat bg-black h-full bg-[url('https://res.cloudinary.com/dc7irvi43/image/upload/v1720286820/mes8_dvikww.jpg')]`}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slicker;
