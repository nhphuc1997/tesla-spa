'use client'
import { Radio, Image, Typography } from "antd";
import { useState } from "react";

interface Props {
  name?: string
  description: any
}

export default function DescriptionPane({ description }: Props) {
  const [value, setValue] = useState(1);

  return (
    <div className="p-3 border">
      <Typography.Title level={5}>Description</Typography.Title>
      <div className="px-5">
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </div>
    </div>
  )
}