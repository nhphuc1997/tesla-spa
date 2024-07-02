import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface SlickerProps {
  name?: string
  alowMaxHeight?: boolean
  desktopSlidesToShow: number
  desktopSlidesToScroll: number,
  autoPlay?: boolean
}

const Slicker = ({ desktopSlidesToShow, desktopSlidesToScroll, alowMaxHeight, autoPlay }: SlickerProps) => {
  const _height = alowMaxHeight ? 'h-96' : 'h-32'
  const _autoPlay = autoPlay ? autoPlay : false

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
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="slider-container py-3">
      <Slider {...settings}>
        {[1, 2, 3, 4, 5, 6, 7].map(item => (
          <div className={`${_height} w-32 px-3`}>
            <div className="flex justify-center bg-black items-center text-white h-full rounded-lg">{item}</div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default Slicker;
