import { S3_URL } from "@/utils";
import { Button, Image, Typography } from "antd";

export default function MaterialCombination() {
  return (
    <div className="p-3 border">
      <Typography.Title level={5}>Material Combination</Typography.Title>
      <div className="flex-col lg:flex-row flex justify-start items-start">
        <div>
          <Image className="border" preview={false} alt="" src={`https://mediaservice.audi.com/media/cdb/data/3458017d-3a71-45b1-819e-ddfcf77d4ea5.jpg`} />
        </div>
        <div className="mx-3" />
        <div className="flex  flex-col">
          <Typography.Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
            Leather/leatherette combinationr, Seats: Black-Black-Steel Grey, Dashboard: Black-Black, Carpet: Black, Headliner: Rock Grey
          </Typography.Paragraph>
          <Button disabled className="w-1/2" ghost>Include in configuration</Button>
        </div>
      </div>
    </div>
  )
}
