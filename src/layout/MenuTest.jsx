import { Button, Layout, Menu, Image } from "antd";
const { Header, Sider, Content } = Layout;
import { Outlet, Link } from "react-router-dom";

const test = () => {
  return (
    <>
      <div style={{ color: "white" }}>
        <ui style={{ display: "flex" }}>
          <li>
            {/* <Menu.Item> */}
            <Link to="/home">HOme</Link>
            {/* </Menu.Item> */}
          </li>
          <li>About</li>
          <li>Contact</li>
        </ui>
      </div>
    </>
  );
};
export default test;
