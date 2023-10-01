import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useDispatch } from "react-redux";
import { setLoginDetails } from "../../redux/reducerSlices/userSlice";
import styles from "../../styles/register.module.css";
const LoginSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const Login = () => {
  const toast = useToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const handleLogin = async (values) => {
    const res = await fetch("http://localhost:3005/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (data.isLoggedIn) {
      dispatch(setLoginDetails(data));
      if (data.userInfo.role == "Admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }
    }

    toast({
      title: data.msg,
      status: res.status == 401 ? "warning" : "success",
      isClosable: true,
    });
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="text-xl font-bold leading-tight tracking-tight pb-3 text-gray-900 md:text-2xl dark:text-white">
            Signup
          </h1>
          <Formik
            initialValues={{
              phoneNumber: "",
              password: "",
            }}
            validationSchema={LoginSchema}
            onSubmit={(values, { resetForm }) => {
              handleLogin(values);
              resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form className="space-y-4 md:space-y-6">
                <div>
                  <label
                    for="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Phone Number
                  </label>
                  <Field
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                {errors.phoneNumber && touched.phoneNumber ? (
                  <div>{errors.phoneNumber}</div>
                ) : null}
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}

                <button
                  type="submit"
                  className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign In
                </button>
              </Form>
            )}
          </Formik>
          <p className="text-sm font-light pt-3 text-gray-500 dark:text-gray-400">
            Don't have an account yet?{" "}
            <Link
              href="/register"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
