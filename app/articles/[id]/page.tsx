"use client";

import { Breadcrumb, Col, FloatButton, Row } from "antd";
import Link from "next/link";

const ArticlePage = () => {
  return (
    <div className="">
      <Breadcrumb
        items={[
          { title: <Link className="" href="/">Trang chủ</Link> },
          { title: "Bài viết" },
        ]}
        className="!py-3"
      />

      <Row gutter={16} className="w-full">
        <Col span={24} className="bg-white h-dvh overflow-y-auto w-full">
          <div className="w-full !p-6 ">
            <div className="w-3/4 mx-auto" dangerouslySetInnerHTML={{ __html: '<p><span style="font-family: arial, helvetica, sans-serif;">So, we have beautifully rendered HTML content on the blog page while considering a variety of possible compromises. We have learnt to use the <em>dangerouslySetInnerHTML. </em>In the coming lectures, we will take <em>Hunting Coder </em>towards its conclusion and add some finishing components. See you then!</span></p>' }} />
          </div>
        </Col>
      </Row>

      <FloatButton.BackTop />
    </div>
  )
}

export default ArticlePage;
