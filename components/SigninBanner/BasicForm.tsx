import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { memo, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Button, Form, FormControl } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import userLoginValidation from "../../validations/userLogin";
import AuthApi from "../../redux/auth/authApi";
import { useAppDispatch } from "../../hooks";
import { userLogin } from "../../redux/auth/action";
import { useRouter } from "next/router";
import { theme } from "../../assets";
import NavigoLoading from "../navigoLoading";
type Props = {};
interface basicInfoProps {
  email: string;
  password: string;
}
const authApi = new AuthApi();

const Index: React.FC<Props> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const stopLoader = (formikHelper: FormikHelpers<basicInfoProps>) => (res) => {
    formikHelper.setSubmitting(false);

    if (res.code === "auth/user-not-found") {
      formikHelper.setFieldError("email", "Email not registered");
      return;
    }
    if (res.code === "auth/too-many-requests") {
      formikHelper.setErrors({
        email: "Too many requests. Please try again later.",
      });
      return;
    }

    if (res.code === "auth/wrong-password") {
      formikHelper.setErrors({
        password: "Wrong password",
      });
      return;
    }
    router.push("/verify-email");
  };
  const handleSubmit = async (
    values: basicInfoProps,
    formikHelper: FormikHelpers<basicInfoProps>
  ) => {
    const { setErrors } = formikHelper;

    const email: string = values.email;
    const { data }: any = await authApi.emailIsExist({ email });
    if (data?.code === "auth/user-not-found") {
      setErrors({
        email: "Email is not registered",
      });
      return;
    }

    if (data?.role !== "user") {
      setErrors({ email: "email not register yet." });
      return;
    }

    dispatch(userLogin(values, stopLoader(formikHelper)));
  };
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          transform: "translateX(100%)",
          opacity: 0,
        }}
        animate={{
          transform: "translateX(0%)",
          opacity: 1,
        }}
        exit={{
          transform: "translateX(-100%)",
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
          <p className="navigo-Links">Create new account?</p>
          <Link href="/signup">
            <a>Sign up</a>
          </Link>
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={userLoginValidation}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            isSubmitting,

            handleBlur,
          }) => (
            <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
              <Form.Group controlId="email">
                <FormControl
                  type="email"
                  placeholder="Email"
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
              <Form.Group controlId="password">
                <div className="password-input">
                  <FormControl
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPassword(!showPassword);
                    }}
                    className="btn "
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </a>
                </div>

                <ErrorMessage
                  name="password"
                  component="div"
                  className="error-message"
                />
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
                  "Sign in"
                )}
              </Button>
            </Form>
          )}
        </Formik>
        <div
          style={{
            fontSize: "14px",
          }}
          className="d-flex gap-1 mb-2 align-items-center mt-2 justify-content-center"
        >
          <Link href="/signin">
            <a>Forgot Password?</a>
          </Link>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Index);
