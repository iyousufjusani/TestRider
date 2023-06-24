import React from "react";

export interface RouteData {
  path: string;
  layout?: React.ComponentType<any>;
  guard?: React.ComponentType<any>;
  component: React.ComponentType<any>;
  check?: React.ComponentType<any>;

  subRoutes?: RouteData[];
}
export interface AddressProps {
  address: string;
  city?: string | null;
  area?: string | null;
  county?: string | null;
  country?: string | null;
  latValue: number;
  lngValue: number;
  postCode?: string | null;
  road?: string | null;
}
export interface tokensState {
  access: string;
  refresh: string;
  expirationTime: number;
}
interface userProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: string;
  id: string;
  emailVerified: boolean;
  profileImage?: string;
  provideDocuments?: boolean;
  address?: AddressProps;
  provider?: string;
  name?: string;
}

export interface authState {
  user: userProps | null;
  token: tokensState | null;
}
export interface forgetPasswordState {
  email: string;
}

export interface userContext {
  currentStep: number;
  basicInfo: {
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
}

export interface loginState {
  password: string;

  email: string;
}
export interface registerState {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password?: string;
  confirmPassword?: string;
}

export interface homeJoinUsCard {
  title: string;
  description: string;
  image: string;
  link: string;
  linkText: string;
  id: string;
}

export interface HomeServicesProps {
  title?: string;
  description?: string;
  image?: string;
  imageLeft?: boolean;
  imageAlt?: string;
  id?: string;
}
export interface HomeFacilityProps {
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  id?: string;
}
export interface WhyNavigoFeaturesProps {
  title?: string;
  description?: string;
}
export interface HomeFAQSProps {
  title?: string;
  description?: string;
  key: string;
}

export interface HomeVehicleProps {
  name?: string;
  image?: string;
  id: string;
  passengers?: number | undefined;
  description?: string[];
}
