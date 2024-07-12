import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Typography, Image } from "antd";
import { useRouter } from "next/navigation";
import { S3_URL } from "@/utils";

interface SlickerProps {
  name?: string;
  alowMaxHeight?: boolean;
  desktopSlidesToShow: number;
  desktopSlidesToScroll: number;
  autoPlay?: boolean;
  data?: Array<any>;
  type?: "image" | "block";
  showChild?: boolean;
  centerMode?: boolean;
}

const Slicker = ({
  desktopSlidesToShow,
  desktopSlidesToScroll,
  alowMaxHeight,
  autoPlay,
  data = [],
  type = "image",
  showChild = false,
  centerMode = false,
}: SlickerProps) => {
  const _height = alowMaxHeight ? "h-96" : "h-32";
  const _autoPlay = autoPlay ? autoPlay : false;

  const router = useRouter();

  const settings = {
    dots: false,
    infinite: true,
    autoplay: _autoPlay,
    speed: 3000,
    centerMode: centerMode,
    slidesToShow: desktopSlidesToShow,
    slidesToScroll: desktopSlidesToScroll,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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
    <div className="slider-container py-1 cursor-pointer">
      <Slider {...settings}>
        {data?.map((item) => (
          <div className={`${_height}`} key={item.id}>
            <div
              className="bg-center bg-cover bg-no-repeat h-full"
              style={{ backgroundImage: `url("${S3_URL}/${item.s3Key}")` }}
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
                  <div className="px-3 hidden lg:block" key={item.id}>
                    <Image
                      alt=""
                      className=""
                      height={100}
                      src={`${S3_URL}/${item.s3Key}`}
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
