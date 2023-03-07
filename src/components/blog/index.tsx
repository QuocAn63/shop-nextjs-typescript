import { Image, Typography } from "antd";
import Link from "next/link";

const Blog = () => {
  return (
    <Link
      href="/"
      className="flex flex-col justify-center w-full h-full mt-4 hover:shadow transition-all"
      title="ADIDAS STAN SMITH: ĐÔI GIÀY PHỔ BIẾN NHẤT CỦA THƯƠNG HIỆU ADIDAS"
    >
      <Image
        src="/643333-7297.jpg"
        alt="643333-7297.jpg"
        className="w-full h-full"
        preview={false}
      />
      <div className="mt-2 px-5">
        <Typography.Title level={4}>
          ADIDAS STAN SMITH: ĐÔI GIÀY PHỔ BIẾN NHẤT CỦA THƯƠNG HIỆU ADIDAS
        </Typography.Title>
        <Typography.Text className="text-md">25/02/2023</Typography.Text>
      </div>
    </Link>
  );
};

export default Blog;
