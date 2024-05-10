import React, { useEffect, useState } from "react";
import { Avatar, Card, Button, Dropdown, Menu, Space } from "antd";
import { RightOutlined, DownOutlined, LogoutOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { useUser } from "../context/UserContent";
const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
const GapList = [4, 3, 2, 1];
//context

//end context
const App = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [color, setColor] = useState(ColorList[0]);
  const [gap, setGap] = useState(GapList[0]);
  const [isArrowDown, setIsArrowDown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    localStorage.setItem("isLoggedIn", "false");
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    setIsLoggedIn(false);
  };
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      window.location.reload();
    }
  }, [isLoggedIn, navigate]);
  const menu = (
    <Space>
      <>
        <div
          style={{
            display: "block ",
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
            // paddingLeft: "15px",
            // paddingRight: "15px",
            paddingTop: "5px",
            paddingBottom: "5px",
            background: "white",
          }}
        >
          <div style={{ textAlign: "center" }}>{user ? user.value : ""}</div>
          {/* <div> */}
          <hr style={{ width: "150px", border: "#F5F5F5	 solid 0.5px	" }} />
          {/* </div> */}
          <div
            style={{
              textAlign: "center",
              cursor: "pointer",
            }}
            onClick={handleLogout}
          >
            {" "}
            <LogoutOutlined style={{ color: "red", marginRight: "3px" }} />
            Logout
          </div>
        </div>
      </>
    </Space>
  );

  const handleArrowClick = () => {
    setIsArrowDown(!isArrowDown);
  };

  return (
    <>
      <Dropdown overlay={menu} trigger={["click"]}>
        <Space onClick={handleArrowClick}>
          <Avatar
            style={{
              backgroundColor: color,
              verticalAlign: "middle",
              cursor: "pointer",
            }}
            size="large"
            gap={gap}
          >
            {user?.value.charAt(0)}
          </Avatar>
          {isArrowDown ? (
            <DownOutlined
              style={{
                fontSize: "16px",
                color: "#1890ff",
                transition: "transform 0.3s",
              }}
            />
          ) : (
            <RightOutlined
              style={{
                fontSize: "16px",
                color: "#1890ff",
                transition: "transform 0.3s",
              }}
            />
          )}
        </Space>
      </Dropdown>
    </>
  );
};
export default App;
