import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { UserContext } from "../../contexts/userContext";
import BasicForm from "./BasicForm";
import PasswordForm from "./passwordForm";
import SocialLogins from "../SocialLogins";
import styles from "../../styles/Signup.module.css";
type Props = {};
const Index: React.FC<Props> = () => {
  const { state } = useContext<any>(UserContext);
  const { currentStep } = state;
  const CurrentActiveStep = () => {
    switch (currentStep) {
      case 0:
        return <BasicForm />;
      case 1:
        return <PasswordForm />;
      default:
        return null;
    }
  };
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
            <CurrentActiveStep />

            <hr />
            <SocialLogins />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
