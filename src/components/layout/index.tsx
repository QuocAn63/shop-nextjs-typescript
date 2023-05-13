import { ReactNode, useEffect, useState } from "react";
import Header from "../header";
import Footer from "../footer";
import { BrandProps } from "@/lib/api/brand";
import axios from "axios";

const Layout = ({ children }: { children: ReactNode }) => {
  const [brands, setBrands] = useState<BrandProps[]>([]);
  useEffect(() => {
    const getBrands = async () => {
      try {
        const brandResponse = await axios.get("/api/brands");
        const cartResponse = await axios.get("/api/cart");

        setBrands(brandResponse.data);
      } catch (err) {
        console.log(err);
      }
    };

    getBrands();
  }, []);
  return (
    <div className="w-full flex flex-col items-center flex-wrap">
      <Header brands={brands} />
      <div className="min-h-screen mt-[80px] w-full xl:px-[5vw] py-10">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
