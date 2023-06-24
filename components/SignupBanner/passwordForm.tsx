import axios, { AxiosError } from "axios";
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import { memo, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button, Form, FormControl } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useAppDispatch } from "../../hooks";
import userRegisterValidation from "../../validations/userRegister";
import { UserContext } from "../../contexts/userContext";
import { userRegister } from "../../redux/auth/action";
import NavigoLoading from "../navigoLoading";
import { theme } from "../../assets";
type Props = {};
type authProps = {
  password: string;
  confirmPassword: string;
};

const Index: React.FC<Props> = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const { state } = useContext(UserContext);
  const dispatch = useAppDispatch();
  const handleFormik =
    (formProps: FormikHelpers<authProps>) => (result: AxiosError | any) => {
      const { setSubmitting, setErrors } = formProps;
      if (axios.isAxiosError(result)) {
        const { response } = result;
        console.log(response);
        if (response?.status === 400) {
          let data: any = response?.data;
          let message: string = data?.message;

          // setErrors({email: 'Email already exists'})
        }
      } else {
        setSubmitting(false);
      }
    };
  const handleSubmit = (
    values: authProps,
    formProps: FormikHelpers<authProps>
  ) => {
    const payload = {
      password: values.password,
      email: state.basicInfo.email,
      firstName: state.basicInfo.firstName,
      lastName: state.basicInfo.lastName,
      phoneNumber: state.basicInfo.phoneNumber,
    };
    dispatch(userRegister(payload, handleFormik(formProps)));
  };
  return (
    <AnimatePresence>
      <motion.div
        initial={{
          transform: "translateY(100%)",
          opacity: 0,
        }}
        animate={{
          transform: "translateY(0)",
          opacity: 1,
        }}
        exit={{
          transform: "translateY(-100%)",
          opacity: 0,
        }}
      >
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={userRegisterValidation.password}
          onSubmit={handleSubmit}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            handleBlur,
            isSubmitting,
          }) => (
            <Form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
              <Form.Group controlId="password">
                <div className="password-input">
                  <FormControl
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
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
              <Form.Group controlId="confirmPassword">
                <div className="password-input">
                  <FormControl
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <a
                    onClick={(e) => {
                      e.preventDefault();

                      setshowConfirmPassword(!showConfirmPassword);
                    }}
                    className="btn "
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </a>
                </div>

                <ErrorMessage
                  name="confirmPassword"
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
                  "Sign up"
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
