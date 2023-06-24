import { Col, Container, Row } from "react-bootstrap";
import BasicForm from "./BasicForm";

import styles from "../../styles/Signup.module.css";
import SocialLogins from "../SocialLogins";
type Props = {};
const Index: React.FC<Props> = () => {
  return (
    <Container
      fluid
      className={`${styles.BannerContainer} mb-4`}
      style={{
        backgroundImage: `url("/images/signupBanner.png")`,
      }}
    >
      <Row>
        <Col lg={6} className={styles.BanerDescription}>
          <h1>
            Start your trip with <br />
            Navigo now
          </h1>
        </Col>
        <Col lg={5} className={styles.formContainer}>
          <div
            className="w-100 bg-white p-4"
            style={{
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <BasicForm />

            <hr />
            <SocialLogins />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
