import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Input, Row } from "antd";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
const Footer = () => {
  return (
    <div className="bg-black w-full min-h-[220px] flex justify-center">
      <div className="xl:px-[5vw] w-full pt-[35px] pb-[55px]">
        <Row className="text-white" gutter={30}>
          <Col span={6}>
            <h3 className="uppercase text-base pb-5">Contact</h3>
            <div>
              <p className="pb-3 font-thin">
                <strong>Address:</strong>{" "}
                <strong>123 Ho Chi Minh city, Vietnam</strong>
              </p>
              <p className="pb-3 font-thin">
                <strong>Hotline: +84 931 113 123</strong>
              </p>
              <p className="pb-3 font-thin">
                <strong>Email:</strong> <strong>sneakerstore@gmail.com</strong>
              </p>
            </div>
          </Col>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <h3 className="uppercase text-base pb-5">Working time</h3>
                <div>
                  <p className="pb-3 font-thin">
                    <strong>9:30 ~~ 21:30</strong>
                  </p>
                </div>
              </Col>
              <Col span={12} className="mt-8">
                <h3 className="uppercase text-base pb-5">Customer support</h3>
                <div>
                  <p className="pb-3 font-thin">
                    <strong>+84 931 113 123</strong>
                  </p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={6}>
            <h3 className="uppercase text-base pb-5">Social media</h3>
            <div className="flex flex-col gap-2">
              <Link
                href="https://www.facebook.com/quocan.6302/"
                target="_blank"
                className="flex gap-2 items-center"
              >
                <FontAwesomeIcon icon={faFacebook} />
                <span>Sneaker Store FB</span>
              </Link>
              <Link
                href="https://www.facebook.com/quocan.6302/"
                target="_blank"
                className="flex gap-2 items-center"
              >
                <FontAwesomeIcon icon={faInstagram} />
                <span>Sneaker Store IG</span>
              </Link>
              <Link
                href="https://www.facebook.com/quocan.6302/"
                target="_blank"
                className="flex gap-2 items-center"
              >
                <FontAwesomeIcon icon={faTwitter} />
                <span>Sneaker Store TW</span>
              </Link>
            </div>
          </Col>
          <Col span={6}>
            <h3 className="uppercase text-base pb-5">
              Sign up to get the last promotion informations
            </h3>
            <div className="pb-3 font-thin">
              <div className="flex gap-3">
                <Input className="outline-none border-none rounded-none" />
                <Button className="bg-white outline-none border-none font-semibold rounded-none">
                  Send
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Footer;
