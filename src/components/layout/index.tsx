import { ReactNode, useEffect, useState } from "react";
import Header, { HeaderProps } from "../header";
import Footer from "../footer";
import axios from "axios";

const Layout = ({ children }: { children: ReactNode }) => {
  const [headerProps, setHeaderProps] = useState<HeaderProps>();
  useEffect(() => {
    const getBrands = async () => {
      try {
        const brandResponse = await axios.get("/api/brands");
        const cartResponse = await axios.get("/api/cart", {
          withCredentials: true,
        });
        setHeaderProps({
          brands: brandResponse.data,
          cart: cartResponse.data.data,
        });
      } catch (err) {
        console.log(err);
      }
    };

    getBrands();
  }, []);
  return (
    <div className="w-full flex flex-col items-center flex-wrap">
      <Header brands={headerProps?.brands} cart={headerProps?.cart} />
      <div className="min-h-screen mt-[80px] w-full xl:px-[5vw] py-10">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
