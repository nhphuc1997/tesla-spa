import {
  PushpinOutlined,
  SendOutlined,
  TagsOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Descriptions,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Segmented,
  Tag,
  Typography,
  notification,
} from "antd";
import { useRef, useState } from "react";
import Payment from "../payment/Payment";
import { useParams } from "next/navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { doGet, doPost } from "@/utils/doMethod";
import { formatCurrency } from "@/utils/format-currency";
import Slicker from "../Slicker";
import { useClerk } from "@clerk/nextjs";

const NewCar = () => {
  const params = useParams();
  const { user } = useClerk();
  const [api, contextHolder] = notification.useNotification();

  const [bonusPriceColor, setBonusPriceColor] = useState(0);
  const [bonusPriceWheel, setBonusPriceWheel] = useState(0);
  const [bonusPriceInterator, setBonusPriceInterator] = useState(0);
  const [opsColorPicked, setOpsColorPicked] = useState<any>();
  const [opsWheelPicked, setOpsWheelPicked] = useState<any>();
  const [opsInteratorPicked, setOpsInteratorPicked] = useState<any>();
  const [openModalRegistry, setOpenModalRegistry] = useState<boolean>(false);
  const [segment, setSegment] = useState("Options");
  const [openModalOrder, setOpenModalOrder] = useState(false);

  const submitTestDriven = useRef<any>();

  const { data }: any = useQuery({
    queryKey: ["detail-product"],
    queryFn: async () => {
      const products = await doGet(`/products/${params?.id}`);
      const categoryId = products?.data?.category?.id;

      if (categoryId) {
        const category = await doGet(`/categories/${categoryId}`);
        setOpsColorPicked(category?.data?.optionColor[0]);
        setBonusPriceColor(category?.data?.optionColor[0]?.price);

        setOpsWheelPicked(category?.data?.optionWheel[0]);
        setBonusPriceWheel(category?.data?.optionWheel[0]?.price);

        setOpsInteratorPicked(category?.data?.optionInterator[0]);
        setBonusPriceInterator(category?.data?.optionInterator[0]?.price);

        return {
          products: products,
          category: category,
        };
      }

      return {
        products: products,
        category: null,
      };
    },
  });

  const registerDrivenMutation = useMutation({
    mutationFn: async (registerDrivenParams: { phoneNumber: string }) => {
      const userId = user?.id;
      const email = user?.primaryEmailAddress?.emailAddress;
      const phoneNumberFromEmail = user?.primaryPhoneNumber;
      const phoneNumberFromForm = registerDrivenParams?.phoneNumber;
      return await doPost("/registry-driven", {
        userId,
        email,
        phoneNumberFromEmail,
        phoneNumberFromForm,
        productId: params?.id,
      });
    },
    onSuccess() {
      api.open({ message: "", description: "Registry driven successfully" });
      setOpenModalRegistry(false);
    },
    onError() {
      api.open({ message: "", description: "Registry driven failed" });
      setOpenModalRegistry(false);
    },
  });

  const colorPick = (e: RadioChangeEvent) => {
    setBonusPriceColor(e.target.value.price);
    setOpsColorPicked(e.target.value);
  };

  const wheelPick = (e: RadioChangeEvent) => {
    setBonusPriceWheel(e.target.value.price);
    setOpsWheelPicked(e.target.value);
  };

  const interatorPick = (e: RadioChangeEvent) => {
    setBonusPriceInterator(e.target.value.price);
    setOpsInteratorPicked(e.target.value);
  };

  return (
    <Row gutter={16} className="py-3">
      {contextHolder}
      <Col xs={24} md={24} className="">
        <div className="p-3 h-auto w-full bg-white ">
          <div className="mx-3">
            <Slicker
              desktopSlidesToScroll={1}
              desktopSlidesToShow={1}
              alowMaxHeight={true}
              autoPlay={true}
              data={data?.products?.data.images}
              showChild={true}
            />
          </div>

          <Divider />

          <div>
            <Typography.Title
              level={4}
              className=" text-center !mb-0 uppercase"
            >
              <Tag className="ml-2 !bg-black !text-white">
                {data?.products?.data?.category?.name}
              </Tag>
              {data?.products?.data.name}
            </Typography.Title>

            <Typography.Title
              level={3}
              className="!my-0 text-center md:text-left"
            >
              <TagsOutlined className="mr-2" />
              {formatCurrency(
                Number(data?.products?.data?.price) +
                  Number(bonusPriceColor) +
                  Number(bonusPriceWheel) +
                  Number(bonusPriceInterator)
              )}
              <Button
                className="mx-3 !bg-black !text-white"
                onClick={() => setOpenModalOrder(true)}
              >
                PLACE ORDER
              </Button>
              <Button
                className="mx-3 !bg-black !text-white"
                onClick={() => setOpenModalRegistry(true)}
              >
                REGISTRY
              </Button>
            </Typography.Title>
          </div>

          <div className="flex justify-start items-center py-3">
            <Segmented
              defaultValue="center"
              onChange={(value) => setSegment(value)}
              options={[
                "Options",
                "Technical",
                "Size",
                "Mechanical",
                "Document",
              ]}
            />
          </div>

          <div className="w-full">
            {(() => {
              if (segment === "Technical") {
                return (
                  <Descriptions
                    title={
                      <Typography.Title level={5} className="!m-0">
                        Thông số cơ bản
                      </Typography.Title>
                    }
                    bordered={true}
                    column={1}
                    size="small"
                    className=""
                  >
                    <Descriptions.Item className="!pb-1" label="Tổng công suất">
                      {data?.products?.data?.productBasicParam.total_capacity}
                    </Descriptions.Item>
                    <Descriptions.Item
                      className="!pb-1"
                      label="Mô-men xoắn (Nm/vòng/phút)"
                    >
                      {data?.products?.data?.productBasicParam.moment}
                    </Descriptions.Item>
                    <Descriptions.Item
                      className="!pb-1"
                      label="Tăng tốc (0-100 km/h)"
                    >
                      {data?.products?.data?.productBasicParam.acceleration}
                    </Descriptions.Item>
                  </Descriptions>
                );
              }

              if (segment === "Size") {
                return (
                  <Descriptions
                    title={
                      <Typography.Title level={5} className="!m-0">
                        Kích thước tổng thể (mm)
                      </Typography.Title>
                    }
                    column={1}
                    size="small"
                    bordered={true}
                  >
                    <Descriptions.Item className="!pb-1" label="Dài">
                      {data?.products?.data?.productBasicSize.length}
                    </Descriptions.Item>
                    <Descriptions.Item className="!pb-1" label="Rộng">
                      {data?.products?.data?.productBasicSize.width}
                    </Descriptions.Item>
                    <Descriptions.Item className="!pb-1" label="Cao">
                      {data?.products?.data?.productBasicSize.height}
                    </Descriptions.Item>
                  </Descriptions>
                );
              }

              if (segment === "Document") {
                return (
                  <div
                    className="px-10"
                    dangerouslySetInnerHTML={{
                      __html: data?.products?.data?.description,
                    }}
                  />
                );
              }

              if (segment === "Mechanical") {
                return (
                  <div className="py-3">
                    <Descriptions
                      title={
                        <Typography.Title level={5} className="!m-0">
                          Động cơ
                        </Typography.Title>
                      }
                      column={1}
                      size="small"
                      layout="horizontal"
                      bordered={true}
                    >
                      <Descriptions.Item className="!pb-1" label="Mã động cơ">
                        {data?.products?.data?.productBasicEngine.code}
                      </Descriptions.Item>
                      <Descriptions.Item className="!pb-1" label="Loại">
                        {data?.products?.data?.productBasicEngine.type}
                      </Descriptions.Item>
                      <Descriptions.Item className="!pb-1" label="Dung tích">
                        {
                          data?.products?.data?.productBasicEngine
                            .displacementVol
                        }
                      </Descriptions.Item>
                      <Descriptions.Item
                        className="!pb-1"
                        label="Công suất cực đại"
                      >
                        {data?.products?.data?.productBasicEngine.maxRound}
                      </Descriptions.Item>
                      <Descriptions.Item
                        className="!pb-1"
                        label="Mô-men xoắn cực đại"
                      >
                        {data?.products?.data?.productBasicEngine.maxMoment}
                      </Descriptions.Item>
                      <Descriptions.Item
                        className="!pb-1"
                        label="Tiêu chuẩn khí thải"
                      >
                        {data?.products?.data?.productBasicEngine.standH2O}
                      </Descriptions.Item>
                      <Descriptions.Item className="!pb-1" label="Hộp số">
                        {data?.products?.data?.productBasicEngine.code}
                      </Descriptions.Item>
                      <Descriptions.Item
                        className="!pb-1"
                        label="Hệ thống truyền động"
                      >
                        {data?.products?.data?.productBasicEngine.moveSystem}
                      </Descriptions.Item>
                      <Descriptions.Item className="!pb-1" label="Chế độ lái">
                        {data?.products?.data?.productBasicEngine.driverMode}
                      </Descriptions.Item>
                    </Descriptions>
                  </div>
                );
              }

              if (segment === "Options") {
                return (
                  <div className="px-3 bg-white ">
                    <div className="w-full">
                      <Typography.Title level={5} className="!mb-0 !pb-0">
                        Options
                      </Typography.Title>
                      <div className="flex flex-col justify-center items-start !py-3">
                        <div className="!py-3">
                          <Typography.Title level={5}>Pain</Typography.Title>
                          <Radio.Group
                            onChange={colorPick}
                            value={opsColorPicked}
                            disabled={data?.products?.data.kind !== "NEW"}
                          >
                            {data?.category?.data?.optionColor.map(
                              (color: any) => (
                                <Radio
                                  key={color.id}
                                  className="!py-1"
                                  value={color}
                                >
                                  {color?.description}
                                </Radio>
                              )
                            )}
                          </Radio.Group>
                        </div>

                        <div className="py-3">
                          <Typography.Title level={5}>Wheels</Typography.Title>
                          <Radio.Group
                            onChange={wheelPick}
                            value={opsWheelPicked}
                            disabled={data?.products?.data.kind !== "NEW"}
                          >
                            {data?.category?.data?.optionWheel.map(
                              (wheel: any) => (
                                <Radio
                                  key={wheel.id}
                                  className="!py-1"
                                  value={wheel}
                                >
                                  {wheel?.description}
                                </Radio>
                              )
                            )}
                          </Radio.Group>
                        </div>

                        <div className="py-3">
                          <Typography.Title level={5}>
                            Interior
                          </Typography.Title>
                          <Radio.Group
                            onChange={interatorPick}
                            value={opsInteratorPicked}
                            disabled={data?.products?.data.kind !== "NEW"}
                          >
                            {data?.category?.data?.optionInterator.map(
                              (intera: any) => (
                                <Radio
                                  key={intera.id}
                                  className="!py-1"
                                  value={intera}
                                >
                                  {intera?.description}
                                </Radio>
                              )
                            )}
                          </Radio.Group>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </Col>

      <Modal
        open={openModalOrder}
        onCancel={() => setOpenModalOrder(false)}
        footer={null}
      >
        <div className="bg-white">
          <div className="w-full">
            <Typography.Title level={5} className="pb-3">
              <PushpinOutlined className="mr-2" />
              Place order
            </Typography.Title>
            <Payment
              productName={data?.products?.data.name}
              productPrice={data?.products?.data.price}
              productId={data?.products?.data.id}
              total={formatCurrency(
                Number(data?.products?.data?.price) +
                  Number(bonusPriceColor) +
                  Number(bonusPriceWheel) +
                  Number(bonusPriceInterator)
              )}
              color={opsColorPicked}
              wheel={opsWheelPicked}
              interator={opsInteratorPicked}
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={openModalRegistry}
        onCancel={() => setOpenModalRegistry(false)}
        onOk={() => submitTestDriven?.current.click()}
      >
        <div className="w-full">
          <Typography.Title level={5} className="pb-3">
            <PushpinOutlined className="mr-2" /> Registry
          </Typography.Title>

          <div className="w-full mx-auto">
            <div className="p-3 ">
              <Form
                layout="vertical"
                name="wrap"
                colon={false}
                onFinish={registerDrivenMutation.mutate}
              >
                <Form.Item
                  label="phoneNumber"
                  name="phoneNumber"
                  rules={[{ required: true }]}
                >
                  <Input placeholder="0123456789" />
                </Form.Item>

                <Button
                  ref={submitTestDriven}
                  block
                  htmlType="submit"
                  icon={<SendOutlined />}
                  iconPosition="end"
                  className="!hidden"
                />
              </Form>
            </div>
          </div>
        </div>
      </Modal>
    </Row>
  );
};

export default NewCar;
