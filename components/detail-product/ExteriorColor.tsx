'use client'
import { S3_URL } from "@/utils";
import { Radio, Image, Typography, Empty } from "antd";
import { useState } from "react";

interface Props {
  name?: string
  exterior: any
}

export default function ExteriorColor({ exterior }: Props) {
  const [value, setValue] = useState(1);

  if (exterior?.length <= 0) {
    return <Empty />
  }

  return (
    <div className="p-3 border">
      <Typography.Title level={5}>Exterior Color</Typography.Title>
      <Radio.Group onChange={(e: any) => setValue(e?.target?.value)} value={value}>
        <div className="flex flex-col xl:flex-row">
          {exterior?.map((item: any) => (
            <Radio value={item.id}>
              <Image
                preview={false}
                width={80}
                src={`${S3_URL}/${item?.s3Key}`}
              />
            </Radio>
          ))}

        </div>
      </Radio.Group>
    </div>
  )
}