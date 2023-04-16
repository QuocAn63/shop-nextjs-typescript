import HorizontalBlogItem from "@/components/blog/horizontalBlog";
import { useQueryParam } from "@/hooks";
import { BlogProps, BlogsWithMetadata, getBlogs } from "@/lib/api/blog";
import clientPromise from "@/lib/mongodb";
import { Col, Pagination, Row, Space } from "antd";
import { GetServerSideProps } from "next";
import { FC } from "react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    await clientPromise;
  } catch (err) {}

  const pageNum = context.query.page
    ? Array.isArray(context.query.page)
      ? Number.parseInt(context.query.page[0])
      : Number.parseInt(context.query.page)
    : 1;

  const blogs = await getBlogs(pageNum);
  console.log(blogs);
  return {
    props: {
      blogs: JSON.parse(JSON.stringify(blogs.data)),
      metadata: blogs.metadata,
    },
  };
};

interface BlogsPageProps extends Pick<BlogsWithMetadata, "metadata"> {
  blogs: BlogProps[];
}

const Blogs: FC<BlogsPageProps> = ({ blogs, metadata }) => {
  const { router, pathname, createQueryString } = useQueryParam();
  return (
    <>
      <header>
        <title>Sneaker Store - Blogs</title>
      </header>
      <main>
        <Row gutter={16}>
          <Col span={16}>
            <Space direction="vertical" size={20}>
              {blogs.map((blog) => (
                <HorizontalBlogItem {...blog} key={blog.slug} />
              ))}
            </Space>
            <Row className="mt-20">
              <Col span={24} className="flex justify-center">
                <Pagination
                  defaultCurrent={1}
                  current={metadata[0].page}
                  total={metadata[0].total}
                  pageSize={metadata[0].pageSize}
                  onChange={(page) =>
                    router.push(
                      pathname +
                        "?" +
                        createQueryString("page", page.toString())
                    )
                  }
                />
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
