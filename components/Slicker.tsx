import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography } from "antd";
import { useRouter } from "next/navigation";

interface SlickerProps {
  name?: string;
  alowMaxHeight?: boolean;
  desktopSlidesToShow: number;
  desktopSlidesToScroll: number;
  autoPlay?: boolean;
  data?: Array<any>;
  type?: "image" | "block";
}

const Slicker = ({
  desktopSlidesToShow,
  desktopSlidesToScroll,
  alowMaxHeight,
  autoPlay,
  data = [],
  type = "image",
}: SlickerProps) => {
  const _height = alowMaxHeight ? "h-96" : "h-32";
  const _autoPlay = autoPlay ? autoPlay : false;

  const router = useRouter();

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

  if (type === "block") {
    return (
      <div className="slider-container py-3 cursor-pointer">
        <Slider {...settings}>
          {data?.map((item) => (
            <div className={`${_height} p-3 `} key={item.id}>
              <div
                onClick={() => router.push(`/list?demand=${item?.value}`)}
                className="hover:drop-shadow-md flex justify-center items-center bg-center bg-cover bg-no-repeat bg-[#31473A] h-full rounded-lg"
              >
                <Typography.Title level={4} className="!text-[#EDF4F2] !mb-0">
                  {item.name}
                </Typography.Title>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  }

  return (
    <div className="slider-container py-3 cursor-pointer">
      <Slider {...settings}>
        {data?.map((item) => (
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
