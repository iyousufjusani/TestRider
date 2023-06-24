import { Empty, Tabs } from "antd";
import { NextPage } from "next";
import { Col, Container, Row } from "react-bootstrap";
import LoginProtection from "../../../Guards/LoginProtection";
import DashboardLayout from "../../../layouts/dashboardlayout";

const { TabPane } = Tabs;

type Props = {};
const Profile: NextPage<Props> = () => {
  return (
    <Container fluid>
      <Row className="gap-3">
        <Col lg={12}>
          <h1 className="dashboard-main-heading">Cancelled Trips</h1>
        </Col>
        <Col lg={12} className=" bg-white rounded-4 shadow h-100">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="All Trips" key="1">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </TabPane>
            <TabPane tab="Previous month" key="2">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </TabPane>
            <TabPane tab="This month" key="3">
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            </TabPane>
          </Tabs>
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
