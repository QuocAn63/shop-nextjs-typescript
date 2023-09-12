import { FC } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Typography } from "antd";

const antIcon = <LoadingOutlined style={{ fontSize: 50 }} spin />;

const Loading: FC = () => {
  return (
    <div className="fixed top-0 right-0 bottom-0 left-0">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-8">
        <Spin indicator={antIcon} />
        <Typography.Title level={1}>Loading page</Typography.Title>
      </div>
    </div>
  );
};

export default Loading;
