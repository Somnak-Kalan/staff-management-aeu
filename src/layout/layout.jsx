import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreOutlined,
  ApartmentOutlined,
  FundOutlined,
  CarryOutOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Image } from "antd";
const { Header, Sider, Content } = Layout;
// const { SubMenu } = Menu;
import AeuLogo from "../../public/images/logo/aeu.svg";
import Avatar from "./Avatar";

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(
      "Dashboard",
      "grp",
      null,
      [getItem("Dashboard", "dashboard", <AppstoreOutlined />, null, null)],
      "group"
    ),
    getItem(
      "Organization",
      "grp",
      null,
      [
        getItem(
          "Organization",
          "sub1",
          <ApartmentOutlined />,
          [
            getItem("Staff", "staff", null, null, null, null),
            getItem("Subjects", "subject", null, null, null, null),
            getItem("Department", "department", null, null, null, null),
            getItem("Position", "position", null, null, null, null),
            getItem("Holiday", "holiday", null, null, null, null),
            getItem("Events", "event", null, null, null, null),
            getItem("Leave Type", "leaveType", null, null, null, null),
          ],
          "group_type"
        ),
      ],
      "group"
    ),
    getItem(
      "Staff Schedule",
      "grp",
      null,
      [
        getItem(
          "Staff Schedule",
          "sub2",
          <CarryOutOutlined />,
          [
            getItem("Schedule", "schedule", null, null, null, null),
            getItem("Apply Schedule", "apply", null, null, null, null),
            getItem("Schedule Rule", "schedule-rule", null, null, null, null),
          ],
          "group_type"
        ),
      ],
      "group"
    ),
    getItem(
      "Reports",
      "grp",
      null,
      [
        getItem(
          "Report",
          "sub3",
          <FundOutlined />,
          [
            getItem("Attendance"),
            getItem(
              "Attendance Report",
              "attendance-report",
              null,
              null,
              null,
              null
            ),
            getItem("Request leave", "request-leave", null, null, null, null),
          ],
          "group_type"
        ),
      ],
      "group"
    ),
  ];

  // Inside your App component

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="flex items-center justify-center ">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "40px",
            }}
            className="rounded-full overflow-hidden"
          >
            <Image className="" width={80} src={AeuLogo} />
          </div>
        </div>

        <Menu
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["1"]}
          items={items.map((el) => ({
            key: el.key,
            label: el.label,
            type: el.type,
            icon: el.icon,
            children: el.children.map((child) => ({
              key: child.key,
              label:
                child.type !== "group_type" ? (
                  <span>
                    {" "}
                    <Link to={child.key}>{child.label} </Link>
                  </span>
                ) : (
                  <span>{child.label} </span>
                ),
              type: child.type,
              icon: child.icon,
              children:
                Array.isArray(child.children) &&
                child.children.map((secondChild) => ({
                  key: secondChild.key,
                  label: (
                    <Menu.Item key={secondChild.key} icon={secondChild.icon}>
                      <Link to={secondChild.key}>{secondChild.label}</Link>
                    </Menu.Item>
                  ),
                })),
            })),
          }))}
        >
          {" "}
          {/* {renderMenuItems(items)} */}
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              padding: 0,
              display: "flex",
              justifySelf: "center",
              justifyItems: "center",
            }}
          >
            <div>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={toggleCollapsed}
                style={{ color: "white" }}
              />
            </div>
            <div style={{ color: "white" }}>Staff Management</div>
          </div>
          <div style={{ color: "red", marginRight: "3vw" }}>
            <Avatar />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
