import type { GetStaticProps, NextPage } from "next";
import { Fragment } from "react";
import { Container } from "react-bootstrap";
import { HomePageData } from "../assets";

import GetARide from "../components/GetARide";
import HomeBanner from "../components/HomeBanner";

import HomeCarsDetail from "../components/HomeCarsDetail";
import HomeDownloadApp from "../components/HomeDownloadApp";
import HomeFAQS from "../components/HomeFAQS";
import HomeSafety from "../components/HomeSafety";
import HomeWhyNavigo from "../components/HomeWhyNavigo";

import {
  HomeFAQSProps,
  HomeVehicleProps,
  WhyNavigoFeaturesProps,
} from "../interfaces";
import GerenalLayout from "../layouts/GerenalLayout";
import styles from "../styles/Home.module.css";
type Props = {
  homeData: {
    homeBanner: {
      imageUrl: string;
    };
    whyNavigo: {
      features: WhyNavigoFeaturesProps[];
      images: string[];
    };

    homeFaqs: HomeFAQSProps[];
    homeVehicles: HomeVehicleProps[];
    homeDownloadApp: {
      title?: string;
      description?: string;
      playStoreUrl?: string;
      appStoreUrl?: string;
      image?: string;
    };
  };
};
const Home: NextPage<Props> = ({ homeData }) => {
  const { whyNavigo, homeBanner, homeDownloadApp, homeFaqs, homeVehicles } =
    homeData;
  return (
    <Fragment>
      <Container fluid className={`p-0 bg-primary ${styles.homeContainer}`}>
        <Container
          fluid
          style={{
            backgroundImage: `url(${homeBanner.imageUrl})`,
          }}
          className={`p-0 ${styles.homeBannerMainContainer}`}
        >
          <HomeBanner />
        </Container>
      </Container>
      <HomeWhyNavigo {...whyNavigo} />
      <GetARide />
      <HomeCarsDetail vehicles={homeVehicles} />
      <HomeSafety />
      <HomeFAQS faqs={homeFaqs} />
      <HomeDownloadApp {...homeDownloadApp} />
    </Fragment>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      homeData: HomePageData,
    },
  };
  // ...
};

Object.assign(Home, {
  layout: GerenalLayout,
});
