import { S3_URL } from "@/utils";
import { Button, Empty, Image, Typography } from "antd";

interface Props {
  name?: string,
  material?: any
}

export default function MaterialCombination({ material }: Props) {
  console.log(material, 'material');


  if (material?.length <= 0) {
    return <Empty />
  }

  return (
    <div className="p-3 border">
      <Typography.Title level={5}>Material Combination</Typography.Title>

      {material?.map((item: any) => (
        <div key={item.id} className="flex-col lg:flex-row flex justify-start items-start">
          <div>
            <Image className="border" preview={false} alt="" src={`${S3_URL}/${item?.s3Key}`} />
          </div>
          <div className="mx-3" />
          <div className="flex  flex-col">
            <Typography.Paragraph ellipsis={{ rows: 4, expandable: true, symbol: 'more' }}>
              {item.name}
            </Typography.Paragraph>
            <Button disabled className="w-1/2" ghost>Included in configuration</Button>
          </div>
        </div>
      ))}
    </div>
  )
}
