import { Image, Carousel } from "antd";
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
  height?: string;
}

const Slicker = ({
  alowMaxHeight,
  data = [],
  showChild = false,
  autoPlay = false,
  height,
}: SlickerProps) => {
  let _height = alowMaxHeight ? "h-96" : "h-32";
  _height = height ? height : _height;

  return (
    <div className="slider-container py-1 cursor-pointer">
      <Carousel arrows autoplay={autoPlay}>
        {data?.map((item) => (
          <div className={`${_height}`} key={item.id}>
            <div
              className="bg-center bg-cover bg-no-repeat h-full"
              style={{ backgroundImage: `url("${S3_URL}/${item.s3Key}")` }}
            />
          </div>
        ))}
      </Carousel>

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
