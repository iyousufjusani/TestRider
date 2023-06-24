import * as yup from "yup";

const schema = yup.object().shape({
  newPassword: yup
    .string()
    .required("Enter your Password")
    .min(6, "Enter atleast 6 digits password"),
  oldPassword: yup.string().required("Enter your Old Password"),

  confPass: yup
    .string()
    .required("Enter confirm password")
    .min(6, "Enter atleast 6 digits password")
    .oneOf([yup.ref("newPassword"), null], "Confirm password not matched"),
});

export default schema;
