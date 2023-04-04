import HorizontalBlogItem from "@/components/blog/horizontalBlog";
import Layout from "@/components/layout";
import { Col, Pagination, Row, Space } from "antd";
import { FC } from "react";

const BlogItem  = {
  id: "1",
  slug: "blog-item-1",
  theme: "/643333-7297.jpg",
  title: "ADIDAS STAN SMITH: ĐÔI GIÀY PHỔ BIẾN NHẤT CỦA THƯƠNG HIỆU ADIDAS",
  author: "admin",
  content: "Giày Adidas Stan Smith đến với những người yêu giày vào năm 1971 với tên gọi chính thức là Stan Smith, nhưng thực tế mẫu giày này ra đời từ năm 1963, khi đó mọi người biết rằng những đôi giày này ó tên gọi khác...",
  createdAt: "2023/03/13"
}

const Blogs: FC = () => {
  return (
    <>
      <header>
        <title>Sneaker Store - Blogs</title>
      </header>
      <main>
          <Row gutter={16}>
            <Col span={16}>
              <Space direction="vertical" size={20}>
                <HorizontalBlogItem {...BlogItem}/>
                <HorizontalBlogItem {...BlogItem}/>
                <HorizontalBlogItem {...BlogItem}/>
                <HorizontalBlogItem {...BlogItem}/>
              </Space>
              <Row className="mt-20">
                <Col span={24} className="flex justify-center">
                  <Pagination defaultCurrent={1} total={20} />
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <div className="px-8"></div>
            </Col>
          </Row>
      </main>
    </>
  );
};

export default Blogs;
