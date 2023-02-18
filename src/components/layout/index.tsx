import { PropsWithChildren } from "react";
import Header from "../header";
import Footer from "../footer";

const Layout = (props: PropsWithChildren) => {
  return (
    <div className="w-full flex flex-col items-center flex-wrap">
      <Header />
      <div className="min-h-screen">{props.children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
