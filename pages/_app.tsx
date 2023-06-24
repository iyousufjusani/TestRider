import "antd/dist/antd.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import { Fragment, useEffect, useMemo, useState } from "react";
import "react-phone-number-input/style.css";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PersistGate } from "redux-persist/integration/react";
import ScreenLoader from "../components/ScreenLoader";
import { persistor, store } from "../config/store";
import Geocode from "react-geocode";
import { getCurrentUser } from "../redux/auth/action";
import "../styles/globals.css";
import "../styles/theme.scss";
import {
  siteDescription,
  siteFav,
  siteName,
  siteTitle,
} from "../utils/siteInfo";
Geocode.setApiKey(process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "");
function MyApp({ Component, pageProps }: AppProps | any) {
  const { ContextProvider, Layout, pageTitle, Protection } = useMemo(() => {
    return {
      ContextProvider: Component.context || Fragment,
      Layout: Component.layout || Fragment,
      pageTitle: Component.pageTitle || "",
      Protection: Component.protection || Fragment,
    };
  }, [Component]);
  const [loader, setLoader] = useState(true);
  const stopLoader = () => {
    setLoader(false);
  };
  useEffect(() => {
    setLoader(true);
    store.dispatch(getCurrentUser(stopLoader));
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Protection>
          <ContextProvider>
            <Head>
              <title>
                {pageTitle
                  ? pageTitle + ` - ${siteName()}`
                  : siteName() + " - " + siteTitle()}
              </title>
              <meta
                name="title"
                content={
                  pageTitle
                    ? pageTitle + ` | ${siteName()}`
                    : siteName() + " - " + siteTitle()
                }
              />
              <meta name="description" content={siteDescription()} />
              <link rel="icon" href={siteFav()} />
            </Head>
            <Layout>
              {loader ? (
                <ScreenLoader src="/vedios/loaderLogo.gif" />
              ) : (
                <Component {...pageProps} />
              )}
            </Layout>
          </ContextProvider>
        </Protection>
      </PersistGate>
      <ToastContainer />
    </Provider>
  );
}

export default MyApp;
