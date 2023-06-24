import Image from "next/image";
import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { WhyNavigoFeaturesProps } from "../../interfaces";
import styles from "../../styles/Home.module.css";

type Props = {
  features: WhyNavigoFeaturesProps[];
  images: string[];
};

const Index: React.FC<Props> = ({ features, images }) => {
  return (
    <Container fluid className="py-5">
      <Row className="gap-1">
        <Col xs={5} sm={3}>
          <div className={styles.whyNavigoIconsBox}>
            <div className={`${styles.whyNavigoIcons} me-auto`}>
              {images?.map((image, index) => (
                <div className={styles.whyNavigoIcon} key={index}>
                  <Image layout="fill" src={`/${image}`} alt="car safety" />
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col lg={8} xs={6} className={styles.whyNavigoFeatureBox}>
          <Container fluid className="p-0">
            <Row className="gap-4">
              {features?.map((feature, index) => (
                <Col className={styles.whyNavigoFeature} key={index} lg={12}>
                  <h2 className="home-sub-heading">{feature.title}</h2>
                  <p>{feature.description}</p>
                </Col>
              ))}
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Index);
