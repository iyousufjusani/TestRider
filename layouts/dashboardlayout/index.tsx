import {
  ContactsOutlined,
  LogoutOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Layout, Modal } from "antd";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useState } from "react";
import { Button } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { userLogout } from "../../redux/auth/action";

import { UserOutlined } from "@ant-design/icons";

import styles from "../../styles/DashboardLayout.module.css";

const { Header, Content } = Layout;
type Props = {
  children?: JSX.Element;
};
const Index: React.FC<Props> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const onToggle = () => {
    setCollapsed(!collapsed);
  };

  const { user } = useAppSelector((state) => state.auth);

  const router = useRouter();

  const [loader, setLoader] = useState(false);
  const stopLoader = () => {
    router.push("/signin");
  };
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    setLoader(true);
    dispatch(userLogout(stopLoader));
  };
  function confirm() {
    Modal.confirm({
      title: "Logout",
      icon: <LogoutOutlined />,
      content: "Want to Logout?",
      onOk: logoutHandler,
      okText: loader ? "Waiting..." : "Logout",
      cancelText: "Cancel",
    });
  }

  const menu = (
    <div className="bg-white shadow rounded-4 w-80 p-2">
      <p className="text-center text-sm font-bold border-b m-0">{user?.name}</p>
      <div
        className={`d-flex flex-column gap-2  border-b  ${styles.customMenu}`}
      >
        <div className={`d-flex align-items-center gap-1 `}>
          <MailOutlined className=" text-lg mr-2" />

          {user?.email}
        </div>
        <div
          className={`d-flex flex-row align-items-center justify-content-start gap-1 navigo-Links `}
        >
          <ContactsOutlined />
          <Link href="/contact-us">
            <a
              target={"_blank"}
              className=" text-sm text-black text-start   font-bold "
            >
              Contact us
            </a>
          </Link>
        </div>
      </div>

      <Button
        style={{
          fontSize: "12px",
        }}
        className="d-flex gap-2 justify-content-center align-items-center mx-auto w-50 my-2"
        onClick={confirm}
      >
        <LogoutOutlined />
        Logout
      </Button>
    </div>
  );
  console.log("Layout render");
  return (
    <Layout
      className={`${styles.siteLayoutBackground} shadow`}
      style={{ minHeight: "100vh" }}
    >
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header
          className=" shadow-md d-flex flex-row items-items-center justify-content-between px-4"
          style={{ padding: 0 }}
        >
          <div>
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "text-lg text-white",
                onClick: onToggle,
              }
            )}
          </div>

          <Dropdown className="my-auto" overlay={menu}>
            <Avatar
              style={{
                cursor: "pointer",
              }}
              size={50}
              src={user?.profileImage}
              icon={<UserOutlined />}
            />
          </Dropdown>
        </Header>

        <Content
          className={styles.siteLayoutBackground}
          style={{
            padding: "24px 16px",
            overflow: "auto",
            minHeight: 280,
            height: 280,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default memo(Index);
