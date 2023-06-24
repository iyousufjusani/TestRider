import Image from "next/image";
import { memo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "../../styles/AboutUs.module.css";
import { Input, Space } from 'antd';

const { Search } = Input;
type Props = {
  image?: string;
  title?: string;
  description?: string;
};
const Index: React.FC<Props> = ({ image, title, description }) => {
  const onSearch = (value: string) => console.log(value);
  return (
    <Container fluid className={`p-3  ${styles.bannerContainer}`}>
      <Container className={`shadow rounded-3 p-0 w-75 ${styles.bannerInnerContainer} `}>
          <Search className="m-0" placeholder="input search text" onSearch={onSearch} size="large" style={{ width: "100%" }} />
      </Container>
    </Container>
  );
};

export default memo(Index);
