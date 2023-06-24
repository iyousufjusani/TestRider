import { Collapse } from "antd";
import React, { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { HomeFAQSProps } from "../../interfaces";

const { Panel } = Collapse;
type Props = {
  faqs: HomeFAQSProps[];
};
const Index: React.FC<Props> = ({ faqs }) => {
  return (
    <Container fluid className="py-5">
      <Row>
        <Col lg={12}>
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "bolder",
            }}
            className="text-secondary text-center"
          >
            FAQs
          </h1>
          <Col lg={12}>
            <Collapse className="bg-white" bordered={false}>
              {faqs?.map((faq) => (
                <Panel header={faq.title} key={faq.key}>
                  {faq.description}
                </Panel>
              ))}
            </Collapse>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default memo(Index);
