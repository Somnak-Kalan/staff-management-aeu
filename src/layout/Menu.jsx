import { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;
const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Option 1
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            Option 2
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            Option 3
          </Menu.Item>
        </Menu>
      </Sider>
    </>
  );
};
export default SideBar;
