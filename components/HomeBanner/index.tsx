import Link from "next/link";
import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/Home.module.css";

type Props = {};
const Index: React.FC<Props> = () => {
  return (
    <Container className={` ${styles.homeBannerContainer}`} fluid>
      <Row className=" w-100 h-100 ">
        <Col lg={12}>
          <div className={styles.homeBannerDescriptionBox}>
            <p>
              A safer, better
              <br /> way to ride
            </p>

            <Link href={`/book-ride`}>
              <a className="btn bg-secondary btn-rounded">Book a ride</a>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
export default memo(Index);
