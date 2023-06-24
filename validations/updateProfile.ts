import * as yup from "yup";

const schema = yup.object().shape({
  firstName: yup.string().required("Enter your First name"),
  lastName: yup.string().required("Enter your Last name"),

  email: yup.string().required("Enter your Email").email("Enter a Valid Email"),
  address: yup.object().shape({
    address: yup.string().required("Enter your address"),
    city: yup.string(),
    area: yup.string(),
    county: yup.string(),
    country: yup.string(),
    latValue: yup.number(),
    lngValue: yup.number(),
    postCode: yup.string(),
    road: yup.string(),
  }),
  phoneNumber: yup
    .string()
    .required("Enter your Phone Number")
    .min(13, "Enter atleast 11 characters")
    .max(13, "Enter atmost 11 characters"),
});
export default schema;
