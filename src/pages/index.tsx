import Product from "@/components/product";
import { Carousel, Col, Image, Row, Typography } from "antd";
import Head from "next/head";
import styles from "@/styles/home.module.scss";
import Blog from "@/components/blog";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
import { GetStaticProps, NextPage } from "next";
import clientPromise from "@/lib/mongodb";
import { getNewestProducts, getTopProducts } from "@/lib/api/product";
import { getNewestBlogs } from "@/lib/api/blog";
import { HomeProps, getHomeCategories } from "@/lib/api/home";

type homePropsType = {
  homeProps: HomeProps;
} & NextPage;

export default function Home({ homeProps, ...props }: homePropsType) {
  const NextButton = ({ currentSlide, slideCount, ...props }: any) => {
    return <RightCircleOutlined {...props} />;
  };

  const PrevButton = ({ currentSlide, slideCount, ...props }: any) => {
    return <LeftCircleOutlined {...props} />;
  };

  return (
    <>
      <Head>
        <title>Sneaker Store</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/main-logo.jpg" />
      </Head>
      <main>
        <Row gutter={16} id="categoriesPanel" className={styles.contentSection}>
          {homeProps.homeCategories.map((category) => (
            <Col span={6} key={category.title as string}>
              <Link
                href={`/shop?category=${category.title}`}
                title="Air Jordan 1"
                className={"relative block " + styles.categoryTab}
              >
                <div className="overflow-hidden">
                  <Image
                    className={styles.categoryTab_theme}
                    src={category.theme as string}
                    alt={category.title as string}
                    preview={false}
                  />
                </div>
                <Typography.Title
                  level={4}
                  className={
                    "bg-white bottom-0 absolute text-center left-3 right-3 text-sm " +
                    styles.categoryTab_title
                  }
                >
                  {category.title}
                </Typography.Title>
              </Link>
            </Col>
          ))}
        </Row>
        <Row gutter={16} id="newReleases" className={styles.contentSection}>
          <Col span={24}>
            <Typography.Title level={1} className="text-center tracking-wider">
              NEW RELEASES
            </Typography.Title>
          </Col>
          <Col span={24} className="relative">
            <Carousel
              autoplay
              dots={false}
              slidesToShow={4}
              arrows
              prevArrow={<PrevButton />}
              nextArrow={<NextButton />}
            >
              {homeProps.newestProducts.map((product) => (
                <Product key={product.modelId} {...product} />
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row gutter={16} id="topSellers" className={styles.contentSection}>
          <Col span={24}>
            <Typography.Title level={1} className="text-center tracking-wider">
              TOP SELLERS
            </Typography.Title>
          </Col>
          <Col span={24} className="relative">
            <Carousel
              dots={false}
              autoplay
              slidesToShow={4}
              arrows
              prevArrow={<PrevButton />}
              nextArrow={<NextButton />}
            >
              {homeProps.topProducts.map((product) => (
                <Product key={product.modelId} {...product} />
              ))}
            </Carousel>
          </Col>
        </Row>
        <Row gutter={16} id="blogs" className={styles.contentSection}>
          <Col span={24}>
            <Typography.Title level={1} className="text-center tracking-wider">
              BLOGS
            </Typography.Title>
          </Col>
          {homeProps.newestBlogs.map((blog) => (
            <Col span={8} key={blog.slug}>
              <Blog {...blog} />
            </Col>
          ))}
          <Col span={24} className="text-center mt-8">
            <Link href="/1">View more</Link>
          </Col>
        </Row>
        <Row gutter={16} id="about" className={styles.contentSection}>
          <Col span={12}>
            <div className="h-[800px] w-full border border-gray-400"></div>
          </Col>
          <Col span={12} className="flex justify-center">
            <div className="max-w-[80%]">
              <Typography.Paragraph className="text-3xl font-semibold text-gray-500">
                Sneaker Store
              </Typography.Paragraph>
              <blockquote className="border-l-[5px] block border-gray-200 px-5 py-2">
                <Typography.Paragraph className="text-lg font-medium text-gray-600">
                  Trong xu thế nền văn hóa sát mặt đất và ngành công nghiệp thời
                  trang đường phố đang rất phát triển tại Việt Nam, hàng trăm
                  cửa hàng nổi lên, không hề có sự chọn lọc nhất định, kèm theo
                  đó là một số vấn đề liên tục phát sinh khiến ta đắn đó quyết
                  định mua item yêu thích của mình.
                </Typography.Paragraph>
              </blockquote>
              <Typography.Text className="text-md py-3 block text-base font-medium">
                Online Sneaker Store là một trong những cửa hàng về sneakers
                chính hãng đầu tiên tại Việt Nam nói chung và Sài Gòn nói riêng.
                Qua nhiều năm phát triển và tạo dựng uy tín, bên cạnh mặt hàng
                sneaker thì Online Sneaker Store ngày này còn phân phối nhiều
                mặt hàng chính hãng khác như quần áo, túi xách, phụ kiện.
              </Typography.Text>
            </div>
          </Col>
        </Row>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    await clientPromise;
  } catch (err) {}

  const homeCategories = await getHomeCategories();
  const newestProducts = await getNewestProducts();
  const topProducts = await getTopProducts();
  const newestBlogs = await getNewestBlogs();

  return {
    props: {
      homeProps: JSON.parse(
        JSON.stringify({
          homeCategories,
          newestProducts,
          topProducts,
          newestBlogs,
        })
      ),
    },
  };
};
