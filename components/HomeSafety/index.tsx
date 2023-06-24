import Image from "next/image";
import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/Home.module.css";

type Props = {};

const Index: React.FC<Props> = () => {
  return (
    <Container className="py-5">
      <Row>
        <Col className="p-2">
          <div className={styles.homeSafetyImg}>
            <Image
              style={{
                borderRadius: "10px",
              }}
              layout="fill"
              src={"/images/safetyfirst.jpeg"}
              alt={"safetyfirst"}
            />
          </div>
        </Col>
        <Col lg={7}>
          <div className={styles.homeSafetyDetail}>
            <h1 className="text-secondary">Safety</h1>
            <p>
              We`re aiming to make Navigo the most secure means of
              transportation in our area. We plan to achieve this by utilising
              the most recent safety technologies and making sure there is
              active support everywhere. Moreover, you can follow your ride and
              reach us 24/7.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Index);
