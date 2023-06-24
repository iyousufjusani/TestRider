import * as yup from "yup";

const basic = yup.object().shape({
  firstName: yup.string().required("Enter your first name"),
  lastName: yup.string().required("Enter your last name"),

  email: yup.string().required("Enter your email").email("Enter a valid email"),
  phoneNumber: yup
    .string()
    .required("Phone number is required.")
    .min(13, "Enter atleast 11 characters")
    .max(13, "Enter atmost 11 characters"),
  isAllow: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions"),
  isAgree: yup
    .boolean()
    .oneOf([true], "You must agree to the terms and conditions"),
});
const password = yup.object().shape({
  password: yup.string().required("Enter your password"),
  confirmPassword: yup
    .string()
    .required("Enter your confirm password")
    .oneOf([yup.ref("password"), null], "Confirm password not match"),
});
const register = {
  basic,
  password,
};
export default register;
