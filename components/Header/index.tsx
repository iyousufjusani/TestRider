import { Avatar, Dropdown, Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
import React, { memo, useState } from "react";
import { Button, Container, Nav, Navbar, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import styles from "../../styles/Header.module.css";
import { siteLogo } from "../../utils/siteInfo";
import { UserOutlined } from "@ant-design/icons";
import {
  ContactsOutlined,
  LogoutOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  FaCarAlt,
  FaCog,
  FaCreditCard,
  FaQuestionCircle,
} from "react-icons/fa";
import { useRouter } from "next/router";
import { userLogout } from "../../redux/auth/action";

type Props = {
  containerStyles?: React.CSSProperties;
  containerClasses?: string;
};

const Index: React.FC<Props> = ({ containerStyles = {}, containerClasses }) => {
  const { user } = useAppSelector((state) => state.auth);
  function confirm() {
    Modal.confirm({
      title: "Signout",
      icon: <LogoutOutlined />,
      content: "Want to Signout?",
      onOk: logoutHandler,
      okText: loader ? "Waiting..." : "Signout",
      cancelText: "Cancel",
    });
  }

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
  const menu = (
    <div className={`bg-white shadow ${styles.menuContainer}  px-3`}>
      <div
        className={`d-flex flex-column gap-2  border-b justify-content-start`}
      >
        <Link href="/dashboard/cancelledtrips">
          <a
            target={"_blank"}
            className=" text-sm text-black text-start  navigoLink  font-bold "
          >
            <FaCarAlt /> My trips
          </a>
        </Link>

        <Link href="/dashboard/cancelledtrips">
          <a
            target={"_blank"}
            className=" text-sm text-black text-start navigoLink   font-bold "
          >
            <FaCreditCard /> Payment
          </a>
        </Link>

        <Link href="/dashboard/support">
          <a
            target={"_blank"}
            className=" text-sm text-black text-start navigoLink  font-bold "
          >
            <FaQuestionCircle /> Support
          </a>
        </Link>

        <Link href="/dashboard/profile">
          <a
            target={"_blank"}
            className=" text-sm text-black text-start  navigoLink font-bold "
          >
            <FaCog /> Profile settings
          </a>
        </Link>
      </div>

      <Button
        onClick={confirm}
        style={{
          fontSize: "12px",
        }}
        className="d-flex gap-2 justify-content-center align-items-center w-100 my-2"
      >
        <LogoutOutlined />
        Signout
      </Button>
    </div>
  );
  return (
    <Container
      style={containerStyles}
      className={`${styles.headerContainer} ${containerClasses} `}
      fluid
    >
      <Row>
        <Navbar expand="lg" collapseOnSelect variant="dark">
          <Container fluid>
            <Navbar.Brand
              href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}`}
            >
              <div className={styles.navigoLogoBox}>
                <Image
                  src={`/${siteLogo()}`}
                  layout="fill"
                  alt="Navigo Taxis"
                  priority={true}
                />
              </div>
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className={`  ${styles.navLinks} ms-auto gap-3`}>
                <Nav.Link
                  href={`https://${process.env.NEXT_PUBLIC_DRIVE_WEBSITE_LINK}`}
                >
                  Drive
                </Nav.Link>
                <Nav.Link
                  href={`https://${process.env.NEXT_PUBLIC_RIDE_WEBSITE_LINK}`}
                >
                  Ride
                </Nav.Link>
                <Nav.Link
                  href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/location`}
                >
                  Location
                </Nav.Link>

                {user ? (
                  <Dropdown
                    className="my-auto"
                    trigger={["click"]}
                    overlay={menu}
                  >
                    <div className={styles.userDropdown}>
                      <Avatar
                        style={{
                          cursor: "pointer",
                        }}
                        size={30}
                        src={user?.profileImage}
                        icon={<UserOutlined />}
                      />
                      <h1>
                        {user?.firstName} {user?.lastName}
                      </h1>
                    </div>
                  </Dropdown>
                ) : (
                  <Link href={`/signin`}>
                    <a
                      style={{
                        height: 30,
                      }}
                      className={`btn ${styles.navBtn} d-flex  justify-content-center align-items-center  btn-rounded`}
                    >
                      Sign in
                    </a>
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};
export default memo(Index);
