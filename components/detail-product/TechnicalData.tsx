import { Descriptions, Typography } from "antd";

interface Props {
  name?: string,
  technical?: any
}

export default function TechnicalData({ technical }: Props) {

  console.log(technical, 'technical');


  return (
    <div className="p-10 border">
      <Typography.Title level={5}>Technical Data</Typography.Title>
      <div className="pb-3">
        <Descriptions title="Performance" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Max. output">{technical.maxOutput}</Descriptions.Item>
          <Descriptions.Item label="Top speed">{technical.topSpeech}</Descriptions.Item>
          <Descriptions.Item label="Acceleration ">{technical.acceleration}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className="pb-3">
        <Descriptions title="Weights" column={{ xs: 1, md: 2 }}>
          <Descriptions.Item label="Unladen weight">{technical.unladenWeight}</Descriptions.Item>
          <Descriptions.Item label="Gross weight limit">{technical.grossWeight}</Descriptions.Item>
          <Descriptions.Item label="Roof load">{technical.roofLoad}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className="pb-3">
        <Descriptions title="Trailer Weight Limit" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Unbraked">{technical.unbraked}</Descriptions.Item>
          <Descriptions.Item label="At 12% gradient">{technical.at12Gradient}</Descriptions.Item>
          <Descriptions.Item label="At 8% gradient">{technical.at8Gradient}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className="pb-3">
        <Descriptions title="Volumes" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Luggage compartment">{technical.luggageCompartment}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className="">
        <Descriptions title="Driveline" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Transmission">{technical.transmission}</Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  )
}