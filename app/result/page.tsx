"use client";
import React from "react";
import { Button, Divider, Result, Typography } from "antd";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { doGet } from "@/utils/doMethod";

const ResultPage: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();

  const { data } = useQuery({
    queryKey: ["order"],
    queryFn: async () => doGet(`/orders/${params.get("order_id")}`),
  });

  return (
    <Result
      className="h-dvh bg-slate-100"
      status="success"
      title="Chuyển khoản đặt cọc thành công"
      subTitle={
        <div>
          <Typography.Title level={5}>
            Đơn hàng số: ${data?.data?.orderId}
          </Typography.Title>

          <Typography.Text>
            Cảm ơn bạn đã đặt hàng. Chúng tôi sẽ gọi điện xác nhận trong khoản
            1-5 phút tới.
          </Typography.Text>
        </div>
      }
      extra={[<Button onClick={() => router.push("/")}>Trang chủ</Button>]}
    />
  );
};

export default ResultPage;
