import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography, Image } from "antd";
import { useRouter } from "next/navigation";

interface SlickerProps {
  name?: string;
  alowMaxHeight?: boolean;
  desktopSlidesToShow: number;
  desktopSlidesToScroll: number;
  autoPlay?: boolean;
  data?: Array<any>;
  type?: "image" | "block";
  showChild?: boolean;
}

const Slicker = ({
  desktopSlidesToShow,
  desktopSlidesToScroll,
  alowMaxHeight,
  autoPlay,
  data = [],
  type = "image",
  showChild = false,
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
                onClick={() => router.push(`/products?demand=${item?.value}`)}
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
              className="bg-center bg-cover bg-no-repeat  h-full rounded-lg"
              style={{ backgroundImage: `url("${item.url}")` }}
            />
          </div>
        ))}
      </Slider>

      {(() => {
        if (showChild) {
          return (
            <div className="w-full py-3 flex justify-center items-center">
              <Image.PreviewGroup>
                {data?.map((item) => (
                  <div className="px-3" key={item.id}>
                    <Image
                      alt=""
                      className="rounded-lg"
                      height={100}
                      src={item.url}
                    />
                  </div>
                ))}
              </Image.PreviewGroup>
            </div>
          );
        }
      })()}
    </div>
  );
};

export default Slicker;
