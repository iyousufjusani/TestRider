import Image from "next/image";
import Link from "next/link";
import React, { memo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/Home.module.css";

type Props = {
  title?: string;
  description?: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  image?: string;
};
const Index: React.FC<Props> = ({
  title,
  description,
  playStoreUrl,
  appStoreUrl,
  image,
}) => {
  return (
    <Container fluid>
      <Row
        style={{
          backgroundImage: `url("${image}")`,
        }}
        className={styles.homeDownloadAppContainer}
      >
        <Col lg={10} className={`gap-3 ${styles.homeDownloadAppBox} ${styles.careerDownloadAppBox}`}>
          <h1>{title}</h1>
          <p>{description}</p>

          <div className={`gap-2  ${styles.mobileIconBox}`}>
            <Link href={`${playStoreUrl}`} passHref>
              <a>
                <Image
                  width={150}
                  height={50}
                  style={{
                    borderRadius: 8,
                  }}
                  src="/images/google-play-badge.jpg"
                  alt="google-play-store"
                />
              </a>
            </Link>
            <Link href={`${appStoreUrl}`} passHref>
              <a>
                <Image
                  style={{
                    borderRadius: 8,
                  }}
                  width={150}
                  height={50}
                  src="/images/App store.jpg"
                  alt="apple-app-store"
                />
              </a>
            </Link>
          </div>

          <Link href="/contact-us" passHref>
            <a className="btn btn-secondary btn-rounded text-white fw-bold">
              Contact Us
            </a>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
export default memo(Index);
