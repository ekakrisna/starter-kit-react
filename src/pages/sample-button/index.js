import React from "react";
import { Layout, Typography } from "antd";
import { Button } from "../../components";
import { SearchOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Content } = Layout;

const SampleButton = () => {
  return (
    <Layout>
      <Content>
        <Title className="text-center p-5">Sample Button Action</Title>
        <div className="flex justify-center">
          <div className="m-3">
            <Button
              className="text-center"
              icon={<SearchOutlined />}
              type="primary"
              shape="round"
              size="large"
            >
              Button Primary
            </Button>
          </div>
          <div className="m-3">
            <Button
              className="text-center"
              icon={<SearchOutlined />}
              type="secondary"
              shape="round"
              size="middle"
            >
              Button Secondary
            </Button>
          </div>
          <div className="m-3">
            <Button
              className="text-center"
              icon={<SearchOutlined />}
              type="success"
              shape="round"
              size="small"
            >
              Button Success
            </Button>
          </div>
          <div className="m-3">
            <Button
              className="text-center"
              icon={<SearchOutlined />}
              type="info"
              shape="round"
            >
              Button Info
            </Button>
          </div>
          <div className="m-3">
            <Button
              className="text-center"
              icon={<SearchOutlined />}
              type="warning"
              shape="round"
            >
              Button Warning
            </Button>
          </div>
          <div className="m-3">
            <Button
              wrapper={`btn btn-secondary btn-sm`}
              icon={<SearchOutlined />}
              type="primary-border"
              shape="round"
              loading={true}
            >
              Button Error
            </Button>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default SampleButton;
