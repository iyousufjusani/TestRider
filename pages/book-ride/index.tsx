import { NextPage } from "next";
import { Col, Container, Row } from "react-bootstrap";
import NavigoMap from "../../components/NavigoMap";
import LocationDetail from "../../components/LocationDetail";
import RideAddress from "../../components/RideAddress";
import LoginProtection from "../../Guards/LoginProtection";
import GerenalLayout from "../../layouts/GerenalLayout";
import styles from "./BookMe.module.css";

type Props = {};

const Bookme: NextPage<Props> = () => {
  return (
    <Container fluid className={`${styles.bookmeMainContainer} p-0`}>
      <Container fluid className={`${styles.bookmeContainer} p-0`}>
        <div className={styles.bgMapBox}>
          <NavigoMap />
        </div>

        <Row
          style={{
            position: "relative",
            zIndex: 999,
            pointerEvents: "none",
            height: "90%",
          }}
          className={`d-flex justify-content-end py-3 align-items-center `}
        >
          <Col
            lg={5}
            className={`${styles.bookmeFormContainer} shadow-sm h-100  p-3`}
          >
            <RideAddress />
            <hr />
            <LocationDetail />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Bookme;

Object.assign(Bookme, {
  pageTitle: "Book a ride",

  layout: GerenalLayout,
  protection: LoginProtection,
});
