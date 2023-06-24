import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { memo, useContext } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { Button, Form, FormControl } from "react-bootstrap";
import { UserContext } from "../../contexts/userContext";
import { registerState } from "../../interfaces";
import userRegisterValidation from "../../validations/userRegister";
import PhoneInput from "react-phone-number-input";
import styles from "../../styles/Signup.module.css";
import Link from "next/link";
import AuthApi from "../../redux/auth/authApi";
import NavigoLoading from "../navigoLoading";
import { theme } from "../../assets";
const authApi = new AuthApi();

type Props = {};

interface basicInfoProps extends registerState {
  isAgree: boolean;
  isAllow: boolean;
}
const Index: React.FC<Props> = () => {
  const { dispatch, constants }: any = useContext(UserContext);

  const handleSubmit = async (
    values: basicInfoProps,
    formikHelper: FormikHelpers<basicInfoProps>
  ) => {
    const { setSubmitting, setErrors } = formikHelper;

    try {
      const email: string = values.email;
      const phoneNumber: string = values.phoneNumber;

      const { data }: any = await authApi.emailIsExist({ email });
      if (data?.code === "auth/user-found") {
        setErrors({ email: "Email is already exist" });
        return;
      }

      const { data: dataPhone }: any = await authApi.checkPhoneNumber({
        phoneNumber,
      });
      if (dataPhone?.code === "auth/user-found") {
        setErrors({ phoneNumber: "Phone number is already exist" });
        return;
      }
      dispatch({
        type: constants.SET_BASIC_INFO,
        payload: values,
      });
    } catch (error) {
      console.log(error);
    }
    setSubmitting(false);
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          transform: "translateX(-100%)",
          opacity: 0,
        }}
        animate={{
          transform: "translateX(0%)",
          opacity: 1,
        }}
        exit={{
          transform: "translateX(100%)",
          opacity: 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <div
          style={{
            fontSize: "14px",
          }}
          className="d-flex gap-1 mb-2 align-items-center justify-content-center"
        >
          <p className="navigo-Links">Already have an account?</p>
          <Link href="/signin">
            <a>Sign in</a>
          </Link>
        </div>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            isAgree: false,
            isAllow: false,
          }}
          validationSchema={userRegisterValidation.basic}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            errors,
            touched,
            handleBlur,
          }) => (
            <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
              <Form.Group controlId="firstName">
                <FormControl
                  type="text"
                  placeholder="First name"
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="error-message"
                />
              </Form.Group>
              <Form.Group controlId="lastName">
                <FormControl
                  type="text"
                  placeholder="Last name"
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="error-message"
                />
              </Form.Group>
              <Form.Group controlId="email">
                <FormControl
                  type="email"
                  placeholder="Email address"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="error-message"
                />
              </Form.Group>
              <Form.Group controlId="phoneNumber">
                <PhoneInput
                  defaultCountry="GB"
                  placeholder="Phone number"
                  value={values.phoneNumber}
                  onBlur={handleBlur}
                  onChange={(value: string) => {
                    setFieldValue("phoneNumber", value);
                  }}
                />

                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="error-message"
                />
              </Form.Group>

              <Form.Group
                className={`${styles.signupTermsGroup} d-flex`}
                controlId="isAgree"
              >
                <Form.Check
                  name="isAgree"
                  checked={values.isAgree}
                  onBlur={handleBlur}
                  onChange={(event) => {
                    setFieldValue("isAgree", event.target.checked);
                  }}
                />
                <Form.Label
                  className={`m-0 mx-2 ${
                    errors.isAgree && touched.isAgree && "text-danger"
                  } `}
                >
                  By proceeding, I agree to
                  <Link
                    target="_blank"
                    href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/terms-and-conditions`}
                  >
                    <a className="mx-1 text-secondary">Navigo’s Terms of Use</a>
                  </Link>
                  and acknowledge that I have read the
                  <Link
                    target="_blank"
                    href={`https://${process.env.NEXT_PUBLIC_WEBSITE_LINK}/privacy-policy`}
                  >
                    <a className="mx-1 text-secondary">Privacy Policy</a>
                  </Link>
                  .
                </Form.Label>
              </Form.Group>

              <Form.Group
                className={`${styles.signupTermsGroup} d-flex`}
                controlId="isAllow"
              >
                <Form.Check
                  name="isAllow"
                  checked={values.isAllow}
                  onBlur={handleBlur}
                  onChange={(event) => {
                    setFieldValue("isAllow", event.target.checked);
                  }}
                />
                <Form.Label
                  className={`m-0 mx-2 ${
                    errors.isAllow && touched.isAllow && "text-danger"
                  } `}
                >
                  I also agree that Navigo may contact me by email, phone or SMS
                  (including by automated means) at the email address or number
                  I provide, including for marketing purposes.
                </Form.Label>
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
                name="submit"
                className=" text-white "
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className=" d-flex justify-content-center algin-items-center ">
                    <NavigoLoading
                      type="bars"
                      color={theme.colors.secondary}
                      width={30}
                      height={25}
                    />
                  </div>
                ) : (
                  "Continue"
                )}
              </Button>
            </Form>
          )}
        </Formik>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Index);
