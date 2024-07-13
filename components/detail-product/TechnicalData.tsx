import { Descriptions, Typography } from "antd";

interface Props {
  name?: string,
  basicParams?: any
}

export default function TechnicalData({ basicParams }: Props) {
  return (
    <div className="p-10 border">
      <Typography.Title level={5}>Technical Data</Typography.Title>
      <div className="pb-3">
        <Descriptions title="Performance" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Max. output">{basicParams.total_capacity}</Descriptions.Item>
          <Descriptions.Item label="Top speed">{basicParams.moment}</Descriptions.Item>
          <Descriptions.Item label="Acceleration ">{basicParams.acceleration}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className="pb-3">
        <Descriptions title="Weights" column={{ xs: 1, md: 2 }}>
          <Descriptions.Item label="Unladen weight">{basicParams.total_capacity}</Descriptions.Item>
          <Descriptions.Item label="Gross weight limit">{basicParams.total_capacity}</Descriptions.Item>
          <Descriptions.Item label="Roof load">{basicParams.total_capacity}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className="pb-3">
        <Descriptions title="Trailer Weight Limit" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Unbraked">{basicParams.total_capacity}</Descriptions.Item>
          <Descriptions.Item label="At 12% gradient">{basicParams.total_capacity}</Descriptions.Item>
          <Descriptions.Item label="At 8% gradient">{basicParams.total_capacity}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className="pb-3">
        <Descriptions title="Volumes" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Luggage compartment">{basicParams.total_capacity}</Descriptions.Item>
        </Descriptions>
      </div>

      <div className="">
        <Descriptions title="Driveline" column={{ xs: 1, md: 3 }}>
          <Descriptions.Item label="Transmission">{basicParams.total_capacity}</Descriptions.Item>
        </Descriptions>
      </div>
    </div>
  )
}