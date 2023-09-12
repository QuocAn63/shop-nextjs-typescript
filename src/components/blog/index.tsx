import { BlogInterface } from "@/interfaces";
import { Image, Typography } from "antd";
import Link from "next/link";
import { FC } from "react";

const Blog : FC<BlogInterface> = ({id, title, slug, content, theme, author, createdAt, ...props}) => {
  return (
    <Link
      href={`/blogs/${slug}`}
      className="flex flex-col justify-center w-full h-full mt-4 hover:shadow transition-all"
      title={title}
    >
      <Image
        src={`/${theme}`}
        alt={`/${theme}`}
        className="w-full h-full"
        preview={false}
      />
      <div className="mt-2 px-5">
        <Typography.Title level={4}>
    {title}
        </Typography.Title>
        <Typography.Text className="text-md">{createdAt}</Typography.Text>
      </div>
    </Link>
  );
};

export default Blog;
