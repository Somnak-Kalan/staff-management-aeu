import React, { useEffect, useState } from "react";
import { Input, Button, Form, Flex, Card, Image, Divider, message } from "antd";
import AeuImage from "../../public/images/logo/aeu.svg";
import LoginBackground from "../../public/images/logo/login.jpeg";
import { useNavigate } from "react-router-dom";
///
import { Fetch_User } from "../server/Login";
///
const Login = ({ onLogin }) => {
  const [user_login, setUserLogin] = useState([]);

  const navigateTo = useNavigate();
  const warning = ({ content }) => {
    message.warning({
      content: content,
    });
  };
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedPassword = localStorage.getItem("password");
    if (
      storedUsername === user_login.username &&
      storedPassword === user_login.password
    ) {
      onLogin(true);
      navigateTo("/dashboard");
    } else {
      onLogin(false);
    }
  }, []);

  const handleLogin = () => {
    if (username !== "" && password !== "") {
      Fetch_User({ username: username, password: password })
        .then((data) => {
          if (data !== false) {
            localStorage.setItem("username", data.username);
            localStorage.setItem("password", data.password);
            localStorage.setItem("value", data.value);
            setUserLogin(data);
            onLogin(true);
            navigateTo("/dashboard");
            window.location.reload();
          } else {
            warning({ content: "user not found" });
            onLogin(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    } else {
      alert("Please enter username and password");
    }
  };
  return (
    <div
      style={{
        backgroundImage: `url(${LoginBackground})`,
        height: "100vh",
        backgroundSize: "cover",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <Card style={{ width: "30vw" }}>
          <Flex justify="center">
            <Image preview="" width={100} src={AeuImage} />
          </Flex>
          <Divider orientation="center">Staff Management</Divider>

          <Form onFinish={handleLogin}>
            <Form.Item
              // label="Username"
              name="username"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input
                value={username}
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              // label="Password"
              name="password"
              labelCol={{ span: 24 }}
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                value={password}
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Flex justify="end">
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
