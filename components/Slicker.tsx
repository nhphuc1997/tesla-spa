import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SlickerProps {
  name?: string;
  alowMaxHeight?: boolean;
  desktopSlidesToShow: number;
  desktopSlidesToScroll: number;
  autoPlay?: boolean;
  data?: Array<any>;
}

const Slicker = ({
  desktopSlidesToShow,
  desktopSlidesToScroll,
  alowMaxHeight,
  autoPlay,
  data = [],
}: SlickerProps) => {
  const _height = alowMaxHeight ? "h-96" : "h-32";
  const _autoPlay = autoPlay ? autoPlay : false;

  const settings = {
    dots: false,
    infinite: true,
    autoplay: _autoPlay,
    speed: 3000,
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
        {data.map((item) => (
          <div className={`${_height} px-3`} key={item.id}>
            <div
              className="bg-center bg-cover bg-no-repeat bg-black h-full rounded-lg"
              style={{ backgroundImage: `url("${item.url}")` }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Slicker;
