import Button from "@/components/common/Button";
import FormikField from "@/components/common/FormikInput";
import {
  loginInitialValues,
  loginValidationSchema,
} from "@/components/user/consts";
import { LoginRequest } from "@/components/user/types";
import { UserContext } from "@/context/UserContext";
import { ROUTES } from "@/router/consts";
import { ErrorResponse } from "@/types/error";
import { Form, Formik } from "formik";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Form.module.scss";
import { useLoginUser } from "./hooks";

const LoginForm = () => {
  const { login } = useContext(UserContext);
  const [error, setError] = useState("");
  const { mutateAsync: loginUser } = useLoginUser();
  const navigate = useNavigate();

  
  const handleSubmit = async (formValues: LoginRequest) => {
  console.log("Submitting form values:", formValues); // Log formos reikšmes
  try {
    const response = await loginUser(formValues);
    console.log("Login response:", response); // Log atsakymą iš backend
    login(response); // Prisijungimo duomenų išsaugojimas
    navigate(ROUTES.HOME);
  } catch (err) {
    console.error("Error:", err); // Debug klaidą
    const errorMessage = (err as ErrorResponse).response?.data?.message || "Unexpected error";
    setError(errorMessage);
  }
};

  return (
    <div className={styles.container}>
      <Formik
        initialValues={loginInitialValues}
        validationSchema={loginValidationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values).finally(() => setSubmitting(false));
        }}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <h2 className={styles.title}>Login</h2>
            <div className={styles.field}>
              <FormikField name="email" type="email" placeholder="Email" />
            </div>
            <div className={styles.field}>
              <FormikField
                name="password"
                type="password"
                placeholder="Password"
              />
            </div>
            {error && <p className={styles.error}>{error}</p>}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Log in"}
            </Button>
            <div className={styles.link}>
              <Link to={ROUTES.REGISTER} className={styles.signUp}>
                Don't have an account? Sign up
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
