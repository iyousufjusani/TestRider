import React, { memo } from "react";
import { Container } from "react-bootstrap";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import { UserProvider } from "../../contexts/userContext";
type Props = {
  children?: JSX.Element;
};
const Index: React.FC<Props> = ({ children }) => {
  return (
    <UserProvider>
      <Container
        fluid
        className="p-0"
        style={{
          overflowX: "hidden",
        }}
      >
        <Header containerClasses="bg-primary" />

        {children}
        <Footer key="footer" />
      </Container>
    </UserProvider>
  );
};
export default memo(Index);
