import { PropsWithChildren } from "react";
import Header from "../header";
import Footer from "../footer";

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="w-full flex flex-col items-center flex-wrap">
      <Header />
      <div className="min-h-screen mt-[80px] w-full xl:px-[5vw] py-10">
        {props.children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
