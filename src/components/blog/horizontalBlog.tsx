import { BlogProps } from "@/lib/api/blog";
import Image from "next/image";
import Link from "next/link";

const HorizontalBlogItem = ({
  id,
  slug,
  title,
  theme,
  content,
  createdAt,
  author,
  ...props
}: BlogProps) => {
  const BlogContent = ({ ...props }) => (
    <div {...props} dangerouslySetInnerHTML={{ __html: content }} />
  );

  return (
    <div className="border border-gray-200 rounded-md p-6">
      <div className="flex justify-between">
        <span className="text-xs font-semibold">{author.displayName}</span>
      </div>
      <div className="flex gap-5">
        <div className="pr-8">
          <Link href={`/blogs/${slug}`} className="block">
            <h2 className="py-3 text-xl font-semibold">{title}</h2>
          </Link>
          <div className="py-2 text-sm">
            <BlogContent />
          </div>
          <div className="pt-2">
            <span className="text-sm text-gray-500">{createdAt}</span>
          </div>
        </div>
        <Link href={`/blogs/${slug}`} className="shrink-0">
          <Image
            src={`/${theme}`}
            alt={title}
            width={200}
            height={100}
            className="block rounded-2xl"
          />
        </Link>
      </div>
    </div>
  );
};

export default HorizontalBlogItem;
