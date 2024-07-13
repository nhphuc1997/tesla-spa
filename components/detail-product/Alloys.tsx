'use client'
import { Radio, Image, Typography } from "antd";
import { useState } from "react";

export default function Alloys() {
  const [value, setValue] = useState(1);

  return (
    <div className="p-3 border">
      <Typography.Title level={5}>Alloys</Typography.Title>
      <Radio.Group onChange={(e: any) => setValue(e?.target?.value)} value={value}>
        <div className="flex flex-col md:flex-row">
          <Radio value={1}>
            <Image
              preview={false}
              width={80}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Radio>
          <Radio value={2}>
            <Image
              preview={false}
              width={80}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Radio>
          <Radio value={3}>
            <Image
              preview={false}
              width={80}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Radio>
          <Radio value={4}>
            <Image
              preview={false}
              width={80}
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            />
          </Radio>
        </div>
      </Radio.Group>
    </div>
  )
}