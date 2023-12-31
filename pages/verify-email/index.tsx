import { NextPage } from "next";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks";
import VerificationInput from "react-verification-input";

import GerenalLayout from "../../layouts/GerenalLayout";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { ErrorMessage, Formik, FormikHelpers } from "formik";
import emailCodeValidation from "../../validations/emailCode";
import NavigoLoading from "../../components/navigoLoading";
import { theme } from "../../assets";
import { resendEmailCode, verifyEmailCode } from "../../redux/auth/action";
import axios from "axios";
import { useState } from "react";
import VerfiyEmailProtection from "../../Guards/verfiyEmailProtection";
type Props = {};
const VerifyEmail: NextPage<Props> = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [sending, setSending] = useState(false);
  if (!user) {
    return <div>Loading...</div>;
  }
  const stopSending = () => {
    setSending(false);
  };
  const resendVerificationCode = () => {
    setSending(true);
    dispatch(resendEmailCode(stopSending));
  };
  const stopLoader =
    (formikHelper: FormikHelpers<{ code: string }>) => (result: any) => {
      if (axios.isAxiosError(result)) {
        const { response } = result;
        const { data }: any = response;
        formikHelper.setErrors({ code: data?.message });
      }
      formikHelper.setSubmitting(false);
    };
  const handleSubmit = (
    values: { code: string },
    formikHelper: FormikHelpers<{ code: string }>
  ) => {
    dispatch(verifyEmailCode(values, stopLoader(formikHelper)));
  };
  return (
    <Formik
      initialValues={{
        code: "",
      }}
      validationSchema={emailCodeValidation}
      onSubmit={handleSubmit}
    >
      {({
        values,

        handleSubmit,
        isSubmitting,
        setFieldValue,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Container className="my-4">
            <Row
              className="w-50 mx-auto rounded-4 shadow p-4 gap-4"
              style={{
                backgroundColor: "#f5f5f5",
              }}
            >
              <Col lg={12}>Enter 4-digit code sent to you at {user?.email}</Col>
              <Col
                lg={12}
                className="d-flex  align-items-center justify-content-center"
              >
                <div>
                  <VerificationInput
                    classNames={{
                      character: "verfication-character",
                      characterSelected: "verfication-character--selected",
                    }}
                    validChars={"0-9"}
                    value={values.code}
                    onChange={(code) => {
                      setFieldValue("code", code);
                    }}
                    length={4}
                  />

                  <ErrorMessage
                    name="code"
                    component="div"
                    className="error-message"
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="d-flex  align-items-center">
                  <p> I didn&apos;t receive a code </p>
                  <Button onClick={resendVerificationCode} variant="link">
                    Resend Code
                  </Button>
                </div>
              </Col>
              <Col lg={12} className="mt-5">
                <div className="d-flex  align-items-center justify-content-between">
                  <Button className=" btn-circle">
                    <FaArrowLeft />
                  </Button>
                  <Button
                    variant="secondary"
                    disabled={isSubmitting}
                    className=" btn-circle"
                    type="submit"
                  >
                    {isSubmitting ? (
                      <div className="d-flex  align-items-center justify-content-between">
                        <NavigoLoading
                          type="bars"
                          color={theme.colors.primary}
                          width={30}
                          height={25}
                        />
                      </div>
                    ) : (
                      <>
                        Verify <FaArrowRight />
                      </>
                    )}
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Form>
      )}
    </Formik>
  );
};

export default VerifyEmail;

Object.assign(VerifyEmail, {
  pageTitle: "Verify Email",
  layout: GerenalLayout,
  protection: VerfiyEmailProtection,
});
