import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaAppleAlt, FaFacebookF, FaGoogle } from "react-icons/fa";
import { useAppDispatch } from "../../hooks";
import { signinWithProviderPopup } from "../../redux/auth/action";
import ProviderButton from "../ProviderButton";

type Props = {};

const Index: React.FC<Props> = () => {
  return (
    <Container fluid className="p-0 my-4">
      <Row className="gap-3">
        <Col lg={12}>
          <ProviderButton
            providerName="apple"
            label="apple"
            Icon={FaAppleAlt}
          />
        </Col>

        <Col lg={12}>
          <ProviderButton
            providerName="facebook"
            label="facebook"
            Icon={FaFacebookF}
          />
        </Col>
        <Col lg={12}>
          <ProviderButton
            providerName="google"
            label="google"
            Icon={FaGoogle}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Index;
