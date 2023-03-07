import HorizontalBlogItem from "@/components/blog/horizontalBlog";
import Layout from "@/components/layout";
import { Col, Pagination, Row, Space } from "antd";
import { FC } from "react";

const Blogs: FC = () => {
  return (
    <>
      <header>
        <title>Sneaker Store - Blogs</title>
      </header>
      <main>
        <Layout>
          <Row gutter={16}>
            <Col span={16}>
              <Space direction="vertical" size={20}>
                <HorizontalBlogItem />
                <HorizontalBlogItem />
                <HorizontalBlogItem />
                <HorizontalBlogItem />
              </Space>
              <Row className="mt-20">
                <Col span={24} className="flex justify-center">
                  <Pagination defaultCurrent={1} total={20} />
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <div className="px-8">Right Sidebar</div>
            </Col>
          </Row>
        </Layout>
      </main>
    </>
  );
};

export default Blogs;
