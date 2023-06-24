import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaLocationArrow, FaMapPin } from "react-icons/fa";
import IconCircle from "../IconCircle";
import styles from "../../styles/IconCircle.module.css";

type Props = {};
const Index: React.FC<Props> = () => {
  return (
    <Container>
      <Row className={`${styles.locationBox} gap-3`}>
        <Col lg={12}>
          <button className="btn w-100 d-flex align-items-center p-0 rounded-2 gap-3">
            <IconCircle Icon={FaLocationArrow} />
            <div>
              <p className="text-start">Allow location access</p>
              <small>For perfect pickup experience</small>
            </div>
          </button>
        </Col>
        <Col lg={12}>
          <button className="btn w-100 d-flex align-items-center p-0 rounded-2 gap-3">
            <IconCircle Icon={FaMapPin} />
            <div>
              <p className="text-start">Set location on map</p>
            </div>
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Index);
