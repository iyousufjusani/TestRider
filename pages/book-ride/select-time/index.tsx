import { NextPage } from "next";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { IoMdArrowRoundBack } from "react-icons/io";
import NavigoMap from "../../../components/NavigoMap";
import LoginProtection from "../../../Guards/LoginProtection";
import GerenalLayout from "../../../layouts/GerenalLayout";
import styles from "../BookMe.module.css";
import cs from "classnames";
import { DatePicker, TimePicker } from "antd";
import { useRouter } from "next/router";
import Head from "next/head";
import moment from "moment";
type Props = {};
const SelectTime: NextPage<Props> = () => {
  const { query } = useRouter();

  const time = useMemo(() => {
    if (typeof query?.time === "string") {
      return query?.time;
    }
    return "";
  }, [query]);

  const [timeValue, setTimeValue] = useState<string>("");
  const [dateValue, setDateValue] = useState<string>("");

  useEffect(() => {
    if (time) {
      setTimeValue(moment(Number(time)).format("HH:mm a"));
      setDateValue(moment(Number(time)).format("DD MM YY"));
    }
  }, [time]);

  return (
    <Container fluid className={`${styles.bookmeMainContainer} p-0`}>
      <Container fluid className={`${styles.bookmeContainer} p-0`}>
        <div className={styles.bgMapBox}>
          <NavigoMap />
        </div>

        <Row
          style={{
            position: "relative",
            zIndex: 999,
            pointerEvents: "none",
            height: "90%",
          }}
          className={`d-flex justify-content-end p-3 align-items-center `}
        >
          <Col
            lg={5}
            className={`${styles.bookmeFormContainer} shadow-sm h-100  p-3`}
          >
            <div className={cs("d-flex", "h-100", "w-100", "flex-column")}>
              <div className={cs("flex-grow-1")}>
                <div
                  className={cs(
                    "d-flex",
                    "justify-content-between",
                    "align-items-center"
                  )}
                >
                  <Link href="/book-me">
                    <a>
                      <IoMdArrowRoundBack />
                    </a>
                  </Link>
                  <Link href="/book-me">
                    <a>Clear</a>
                  </Link>
                </div>
                <h2>When do you want to be picked up?</h2>
                <div
                  className={cs(
                    "d-flex",
                    "align-items-center",
                    "justify-content-center",
                    "flex-column",
                    "gap-3"
                  )}
                >
                  <DatePicker
                    value={moment(dateValue, "dd MM YY")}
                    format={"ddd, MMM YY"}
                    className="w-75"
                    size={"large"}
                  />
                  <TimePicker
                    value={moment(timeValue, "HH:mm a")}
                    format="hh:mm a"
                    className="w-75"
                    size={"large"}
                  />
                </div>
              </div>
              <div>
                <Button className="w-100" variant="primary">
                  Confirm
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default SelectTime;

Object.assign(SelectTime, {
  pageTitle: "Select time",

  layout: GerenalLayout,
  protection: LoginProtection,
});
export async function getServerSideProps({ query }) {
  const time = query?.time;
  const returnObject = {
    props: {},
  };
  if (!time) {
    Object.assign(returnObject, {
      redirect: {
        permanent: true,
        destination: `/book-ride/select-time?time=${Date.now()}`,
      },
    });
  }
  return returnObject;
}
