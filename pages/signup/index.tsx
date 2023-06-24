import { GetStaticProps, NextPage } from "next";
import { Container } from "react-bootstrap";
import HomeDownloadApp from "../../components/HomeDownloadApp";
import SignupBanner from "../../components/SignupBanner";

import GerenalLayout from "../../layouts/GerenalLayout";

import { UserProvider } from "../../contexts/userContext";

import { HomePageData } from "../../assets";
import LogoutProtection from "../../Guards/LogoutProtection";
type Props = {
  homeDownloadApp: {
    title?: string;
    description?: string;
    playStoreUrl?: string;
    appStoreUrl?: string;
    image?: string;
  };
};

const Signup: NextPage<Props> = ({ homeDownloadApp }) => {
  return (
    <Container fluid className="p-0">
      <SignupBanner />
      <HomeDownloadApp {...homeDownloadApp} />
    </Container>
  );
};

export default Signup;

Object.assign(Signup, {
  pageTitle: "Signup",
  context: UserProvider,
  layout: GerenalLayout,
  protection: LogoutProtection,
});
export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      homeDownloadApp: HomePageData.homeDownloadApp,
    },
  };
  // ...
};
