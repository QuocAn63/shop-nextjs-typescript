import DangerouslyHTML from "@/components/dangerouslyHTML";
import { Col, Row } from "antd";
import { FC } from "react";
import { GetServerSideProps } from "next";
import clientPromise from "@/lib/mongodb";
import { BlogProps, getBlog } from "@/lib/api/blog";

const BlogItem = {
  id: "1",
  slug: "blog-item-1",
  theme: "/643333-7297.jpg",
  title: "ADIDAS STAN SMITH: ĐÔI GIÀY PHỔ BIẾN NHẤT CỦA THƯƠNG HIỆU ADIDAS",
  author: "admin",
  content:
    "Giày Adidas Stan Smith đến với những người yêu giày vào năm 1971 với tên gọi chính thức là Stan Smith, nhưng thực tế mẫu giày này ra đời từ năm 1963, khi đó mọi người biết rằng những đôi giày này ó tên gọi khác...",
  createdAt: "2023/03/13",
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    await clientPromise;
  } catch (err) {}
  const slug = context.query.slug;

  const blog = await getBlog(slug as string);

  if (!blog) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      blog: JSON.parse(JSON.stringify(blog)),
    },
  };
};

interface BlogPageProps {
  blog: BlogProps;
}

const Blog: FC<BlogPageProps> = ({ blog }) => {
  return (
    <>
      <header>
        <title>{blog.title}</title>
      </header>
      <main>
        <Row>
          <Col span={4}></Col>
          <Col span={16}>
            <div className="mb-4">
              <p className="text-4xl font-bold leading-[60px]">{blog.title}</p>
              <p className="font-medium text-gray-500">{blog.createdAt}</p>
            </div>
            <div>
              <DangerouslyHTML content={blog.content} />
            </div>
          </Col>
          <Col span={4}></Col>
        </Row>
      </main>
    </>
  );
};

export default Blog;
