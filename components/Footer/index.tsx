import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import styles from "../../styles/Footer.module.css";
type Props = {};

const Index: React.FC<Props> = () => {
  return (
    <Container fluid>
      <Row className="p-5 gap-4">
        <Col lg={3} md={3}>
          <div className={styles.footerLogoBox}>
            <Link href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}`}>
              <a className={styles.footerLogo}>
                <Image
                  layout="fill"
                  src="/images/navigoLogo.png"
                  alt="navigo taxis"
                />
              </a>
            </Link>

            <div
              className={`${styles.footerSocialBox} gap-2 justify-content-center`}
            >
              <Link href="/">
                <a>
                  <FaFacebookF color="grey" />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <FaTwitter color="grey" />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <FaLinkedinIn color="grey" />
                </a>
              </Link>
              <Link href="/">
                <a>
                  <FaInstagram color="grey" />
                </a>
              </Link>
            </div>
          </div>
        </Col>

        <Col lg={3} md={3}>
          <ul className={` gap-2`}>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/about-us`}
              >
                <a className="navigoLink">About Navigo</a>
              </Link>
            </li>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/our-services`}
              >
                <a className="navigoLink">Services</a>
              </Link>
            </li>

            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/safety-and-community-guidelines`}
              >
                <a className="navigoLink">Safety & Community Guidelines</a>
              </Link>
            </li>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/location`}
              >
                <a className="navigoLink">Cities/Location</a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col lg={3} md={3}>
          <ul className={`navigo-Links gap-2`}>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/contact-us`}
              >
                <a className="navigoLink">Contact Us</a>
              </Link>
            </li>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/terms-and-conditions`}
              >
                <a className="navigoLink">Terms & Conditions</a>
              </Link>
            </li>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/privacy-policy`}
              >
                <a className="navigoLink">Our Policy</a>
              </Link>
            </li>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/career`}
              >
                <a className="navigoLink">Career</a>
              </Link>
            </li>
          </ul>
        </Col>
        <Col>
          <ul className={`navigo-Links gap-2`}>
            <li>
              <Link
                href={`https://${process.env.NEXT_PUBLIC_BLOG_WEBSITE_LINK}`}
              >
                <a className="navigoLink">Our Blog</a>
              </Link>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};
export default memo(Index);
