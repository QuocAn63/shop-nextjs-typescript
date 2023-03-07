import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const HorizontalBlogItem: FC = () => {
  return (
    <div className="border border-gray-200 rounded-md p-6">
      <div className="flex justify-between">
        <span className="text-xs font-semibold">Admin</span>
      </div>
      <div className="flex gap-5">
        <div className="pr-8">
          <Link href="/" className="block">
            <h2 className="py-3 text-xl font-semibold">
              ADIDAS STAN SMITH: ĐÔI GIÀY PHỔ BIẾN NHẤT CỦA THƯƠNG HIỆU ADIDAS
            </h2>
          </Link>
          <p className="py-2 text-sm">
            Giày Adidas Stan Smith đến với những người yêu giày vào năm 1971 với
            tên gọi chính thức là Stan Smith, nhưng thực tế mẫu giày này ra đời
            từ năm 1963, khi đó mọi người biết rằng những đôi giày này ó tên gọi
            khác...
          </p>
          <div className="pt-2">
            <span className="text-sm text-gray-500">5 days ago</span>
          </div>
        </div>
        <Link href="/" className="shrink-0">
          <Image
            src="/643333-7297.jpg"
            alt="ADIDAS STAN SMITH: ĐÔI GIÀY PHỔ BIẾN NHẤT CỦA THƯƠNG HIỆU ADIDAS"
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
