import { memo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaClock } from "react-icons/fa";
import AutoCompleteWithMap from "../AutoCompleteWithMap";
import styles from "./RiderAddress.module.css";
import { useAppSelector } from "../../hooks";
import Link from "next/link";

type Props = {};
const Index: React.FC<Props> = () => {
  const { user } = useAppSelector((state) => state.auth);
  console.log(user);

  return (
    <Container>
      <Row className="gap-3">
        <Col lg={12} className={styles.bookmeFormHeader}>
          <h1>WELCOME, {user?.name}</h1>
          <p>Pickup a ride now</p>
        </Col>

        <Col lg={12} className="d-flex flex-column gap-2">
          <AutoCompleteWithMap placeholder="Enter pickup location" />
          <AutoCompleteWithMap placeholder="Enter your dropoff" />
        </Col>

        <Col lg={12}>
          <Link passHref href="/book-ride/select-time">
            <a className=" btn  btn-primary text-white">
              <div className="d-flex  align-items-center   gap-2">
                <p>Leave Now</p>
                <FaClock />
              </div>
            </a>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Index);
