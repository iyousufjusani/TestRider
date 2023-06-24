import Image from "next/image";
import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HomeVehicleProps } from "../../interfaces";
import styles from "../../styles/Home.module.css";

type Props = {
  vehicles: HomeVehicleProps[];
};

const Index: React.FC<Props> = ({ vehicles }) => {
  return (
    <Container
      className={`bg-secondary shadow-sm ${styles.carDetailsContainer} rounded-3  py-4 `}
    >
      {vehicles?.map((vehicle) => (
        <Row key={vehicle.id} className="d-flex  justify-content-center">
          <Col lg={5} md={5}>
            <div className={` ${styles.HomeCarMainBox}  `}>
              <div className={`${styles.HomeCarBox} `}>
                <div id="taxi" className={styles.HomeCarImgBox}>
                  <Image
                    layout="fill"
                    src={`/${vehicle.image}`}
                    alt={vehicle.name}
                  />
                </div>
                <label htmlFor="taxi">{vehicle.name}</label>
              </div>
            </div>
          </Col>
          {vehicle.passengers && (
            <Col lg={7} md={7}>
              <div className={styles.HomeCarDetailBox}>
                <div className={styles.HomeCarDetail}>
                  <p>
                    For{" "}
                    <span className="text-primary mx-1">
                      1-{vehicle.passengers}
                    </span>{" "}
                    Passengers
                  </p>
                  {vehicle.description?.map((des, i) => {
                    return (
                      <p key={i} className=" fw-normal">
                        {des}
                      </p>
                    );
                  })}
                </div>
              </div>
            </Col>
          )}
        </Row>
      ))}
    </Container>
  );
};

export default memo(Index);
