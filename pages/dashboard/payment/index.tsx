import { NextPage } from "next";

import {
  Button,
  Col,
  Container,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import LoginProtection from "../../../Guards/LoginProtection";
import DashboardLayout from "../../../layouts/dashboardlayout";
import styles from "../../../styles/Signup.module.css";

type Props = {};
const Profile: NextPage<Props> = () => {
  return (
    <Container fluid>
      <Row className="gap-3">
        <Col lg={12}>
          <h1 className="dashboard-main-heading">My Payment Details</h1>
        </Col>
        <Col lg={12} className="bg-white rounded-4 shadow p-4">
          <Form className="d-flex flex-column align-items-center gap-3">
            <Form.Group
              controlId="accountHolderName"
              className={styles.formElement}
            >
              <FormControl
                type="text"
                placeholder="Account Holder Name"
                name="firstName"
              />
            </Form.Group>
            <Form.Group controlId="bankName" className={styles.formElement}>
              <FormControl
                type="text"
                placeholder="Bank Name"
                name="lastName"
              />
            </Form.Group>
            <Form.Group
              controlId="accountNumber"
              className={styles.formElement}
            >
              <FormControl
                type="email"
                placeholder="Account Number"
                name="email"
              />
            </Form.Group>

            <Col lg={6} className="d-flex justify-content-center">
              <div>
                <Button
                  type="submit"
                  className={`btn-rounded my-2 text-white ${styles.color}`}
                >
                  Save
                </Button>
              </div>
            </Col>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
export default Profile;

Object.assign(Profile, {
  pageTitle: "Profile",

  layout: DashboardLayout,
  protection: LoginProtection,
});
