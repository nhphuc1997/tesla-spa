'use client'
import { Radio, Image, Typography } from "antd";
import { useState } from "react";

export default function Alloys() {
  const [value, setValue] = useState(1);

  return (
    <div className="p-3 border">
      <Typography.Title level={5}>Alloys</Typography.Title>
      <div className="px-5">
        <div dangerouslySetInnerHTML={{ __html: `<p><span style="font-family: arial, helvetica, sans-serif;">So, we have beautifully rendered HTML content on the blog page while considering a variety of possible compromises. We have learnt to use the <em>dangerouslySetInnerHTML. </em>In the coming lectures, we will take <em>Hunting Coder </em>towards its conclusion and add some finishing components. See you then!</span></p>` }} />
      </div>
    </div>
  )
}