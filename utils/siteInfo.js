import { store } from "../config/store";

export const siteName = () => {
  const { site } = store.getState().site;
  return site?.Settings?.name || "Searching Taxis Near Me In Exeter?";
};
export const siteTitle = () => {
  const { site } = store.getState().site;
  return site?.Settings?.siteTitle || "Book A Taxi Online Now";
};
export const siteLogo = () => {
  const { site } = store.getState().site;
  return site?.Images?.sitelogo || "images/navigoLogo.png";
};
export const siteFav = () => {
  const { site } = store.getState().site;
  return site?.Images?.favIcon || "/images/favCircle.png";
};
export const siteDescription = () => {
  const { site } = store.getState().site;
  return site?.Images?.description || "Are you searching for taxis near me or cabs near me in Exeter? Look no further! Book a taxi online in no time with Navigo.";
};
export const socialFb = () => {
  const { site } = store.getState().site;
  return site?.Settings?.Facebook;
};
export const socialInstagram = () => {
  const { site } = store.getState().site;
  return site?.Settings?.Instagram;
};
export const socialTwitter = () => {
  const { site } = store.getState().site;
  return site?.Settings?.Twitter;
};
export const playStore = () => {
  const { site } = store.getState().site;
  return site?.Settings?.Play;
};
export const appStore = () => {
  const { site } = store.getState().site;
  return site?.Settings?.App;
};
