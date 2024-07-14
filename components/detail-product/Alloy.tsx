"use client";
import { useStore } from "@/stores/products.store";
import { S3_URL } from "@/utils";
import { formatCurrency } from "@/utils/format-currency";
import { Radio, Image, Typography, Empty } from "antd";
import { useState } from "react";

interface Props {
  name?: string;
  alloy: any;
}

export default function Alloy({ alloy }: Props) {
  const productStore = useStore((state: any) => state)

  const [value, setValue] = useState(1);

  const handleChangeAlloy = (event: any) => {
    const value = alloy.find((item: any) => item?.id === event?.target?.value)
    productStore.setCurrentAlloy(value)
  }

  if (alloy?.length <= 0) {
    return <Empty />;
  }

  return (
    <div className="p-3 border">
      <Typography.Title level={5}>Alloy</Typography.Title>
      <Radio.Group
        onChange={(e: any) => setValue(e?.target?.value)}
        value={value}
      >
        <div className="flex flex-col md:flex-row">
          {alloy?.map((item: any) => (
            <Radio key={item.id} value={item.id} onChange={handleChangeAlloy}>
              <div className="flex-col flex justify-start items-center">
                <Image
                  preview={false}
                  width={120}
                  height={120}
                  src={`${S3_URL}/${item?.s3Key}`}
                  alt=""
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
