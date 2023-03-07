import Layout from "@/components/layout";
import { FC } from "react";

const About: FC = () => {
  return (
    <>
      <header>
        <title>Sneaker Store - About</title>
      </header>
      <main>
        <Layout>
          <h3 className="font-semibold text-lg">About us</h3>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Velit
            alias, est sed voluptate mollitia iure autem temporibus quia, quae
            esse dolor in rem error reiciendis! Maxime aperiam praesentium
            facilis id.
          </p>
        </Layout>
      </main>
    </>
  );
};

export default About;
