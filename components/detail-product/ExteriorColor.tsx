"use client";
import { S3_URL } from "@/utils";
import { formatCurrency } from "@/utils/format-currency";
import { Radio, Image, Typography, Empty } from "antd";
import { useState } from "react";

interface Props {
  name?: string;
  exterior: any;
}

export default function ExteriorColor({ exterior }: Props) {
  const [value, setValue] = useState(1);

  if (exterior?.length <= 0) {
    return <Empty />;
  }

  return (
    <div className="p-3 border">
      <Typography.Title level={5}>Exterior Color</Typography.Title>
      <Radio.Group
        onChange={(e: any) => setValue(e?.target?.value)}
        value={value}
      >
        <div className="flex flex-col xl:flex-row">
          {exterior?.map((item: any) => (
            <Radio key={item.id} value={item.id}>
              <div className="flex-col flex justify-start items-center">
                <Image
                  preview={false}
                  width={120}
                  height={80}
                  src={`${S3_URL}/${item?.s3Key}`}
                />

                <Typography.Text className="font-bold">
                  {formatCurrency(item?.price)}
                </Typography.Text>
              </div>
            </Radio>
          ))}
        </div>
      </Radio.Group>
    </div>
  );
}
