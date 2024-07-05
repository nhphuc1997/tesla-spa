"use client";

import { Col, Row } from "antd";

const ArticlePage = () => {
  return (
    <Row gutter={16} className="min-h-dvh">
      <Col span={24} className="pt-6 bg-white">
        <div className="w-3/4 mx-auto">
          <div dangerouslySetInnerHTML={{ __html: '<p><span style="font-family: arial, helvetica, sans-serif;">So, we have beautifully rendered HTML content on the blog page while considering a variety of possible compromises. We have learnt to use the <em>dangerouslySetInnerHTML. </em>In the coming lectures, we will take <em>Hunting Coder </em>towards its conclusion and add some finishing components. See you then!</span></p>' }} />
        </div>
      </Col>
    </Row>
  )
}

export default ArticlePage;
