import Currency from "@/components/currency";
import Layout from "@/components/layout";
import { Product } from "@/interfaces";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Carousel,
  Col,
  Image,
  InputNumber,
  Row,
  Space,
  Typography,
} from "antd";
const productItem: Product = {
  id: "air_jordan_1_mid_light",
  name: "AIR JORDAN 1 MID LIGHT CARDINAL CURRY (GS) [554725-201]",
  theme: "/91-7329.jpg",
  images: [
    "/91-7329.jpg",
    "/91-7329.jpg",
    "/91-7329.jpg",
    "/91-7329.jpg",
    "/91-7329.jpg",
  ],
  price: 4200000,
  promotion: 30,
  category: "AIR JORDAN 6",
  brand: "AIR JORDAN",
  productSizes: ["40.0", "40.5", "41.0", "42.0", "43.0"],
  status: "available",
  description: "",
};

const Product = ({
  id,
  name,
  theme,
  images,
  brand,
  category,
  description,
  price,
  productSizes,
  promotion,
  status,
}: Product) => {
  const NextButton = ({ currentSlide, slideCount, ...props }: any) => {
    return <RightCircleOutlined {...props} />;
  };

  const PrevButton = ({ currentSlide, slideCount, ...props }: any) => {
    return <LeftCircleOutlined {...props} />;
  };

  return (
    <>
      <header>
        <title>Sneaker Store - Product</title>
      </header>
      <Layout>
        <Row gutter={40}>
          <Col span={12}>
            <div className="px-10">
              <Image src={productItem.theme} alt={productItem.name} />
            </div>
            <Carousel autoplay dots={false} slidesToShow={4}>
              {productItem.images.map((image, index) => (
                <div key={index} className="block cursor-pointer">
                  <Image src={image} alt={image} preview={false} />
                </div>
              ))}
            </Carousel>
          </Col>
          <Col span={12}>
            <p className="uppercase text-xl font-semibold mb-1">
              {productItem.brand}
            </p>
            <p className="uppercase text-3xl font-semibold mb-3">
              {productItem.name}
            </p>
            <Currency
              promotion={productItem.promotion}
              className="text-xl font-medium"
              space={12}
            >
              {productItem.price}
            </Currency>
            <div className="w-full h-[1px] bg-black my-5"></div>
            <p className="mb-4">
              <span className="font-medium uppercase mr-1">Model:</span>
              <span>{productItem.id}</span>
            </p>
            <div className="mb-6">
              <p className="font-medium uppercase mr-1 mb-2">Sizes:</p>
              <Space size={12}>
                {productItem.productSizes.map((size) => (
                  <div
                    key={size}
                    className="border border-gray-500 px-2 py-2 cursor-pointer hover:bg-black hover:text-white"
                  >
                    {size}
                  </div>
                ))}
              </Space>
            </div>
            <div className="flex items-center gap-5">
              <InputNumber min={1} defaultValue={1} size="large" />
              <button className="border border-black bg-black text-white hover:text-white h-10 rounded text-center min-w-[200px] font-semibold">
                Buy Now
              </button>
            </div>
            <div className="w-full h-[1px] bg-black my-5"></div>
            <div>
              <p className="font-medium uppercase mr-1 mb-2">Description:</p>
              <Typography.Text>{productItem.description}</Typography.Text>
            </div>
          </Col>
        </Row>
      </Layout>
    </>
  );
};
export default Product;
