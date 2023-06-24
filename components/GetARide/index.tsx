import Image from "next/image";
import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/Home.module.css";

type Props = {};
const Index: React.FC<Props> = () => {
  return (
    <Container fluid className="p-0 py-5">
      <Row>
        <Col lg={8}>
          <div className={`${styles.homeRiderDetail} bg-primary`}>
            <div>
              <h1>Let’s get you a ride</h1>
            </div>
          </div>
        </Col>
        <Col
          style={{
            position: "relative",
          }}
        >
          <div className={styles.homeRiderImage}>
            <Image layout="fill" src="/images/car with mobile.png" alt="car" />
          </div>
          <div className={`${styles.homeRiderImageBox} bg-primary`} />
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Index);
