import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { changeUserDetails } from "../../redux/reducerSlices/userSlice";
import styles from "../../styles/register.module.css";
const EditSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  phoneNumber: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const EditAccount = ({ onClose }) => {
  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const toast = useToast();
  const fetchUserDetails = async () => {
    const res = await fetch("http://localhost:3005/users/" + userDetails._id);
    const data = await res.json();
    if (data) {
      dispatch(changeUserDetails(data.userDetails));
    }
  };
  const editUsersDetails = async (values) => {
    const res = await fetch(
      "http://localhost:3005/account/" + userDetails._id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      }
    );
    const data = await res.json();
    if (res.status == 200) {
      fetchUserDetails();
      onClose();
    }
  };
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
        <Formik
          initialValues={{
            phoneNumber: userDetails.phoneNumber,
            fullName: userDetails.fullName,
          }}
          validationSchema={EditSchema}
          onSubmit={(values) => {
            editUsersDetails(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="space-y-4 md:space-y-6">
              <div>
                <label
                  for="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <Field
                  name="fullName"
                  placeholder="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {errors.fullName && touched.fullName ? (
                <div>{errors.fullName}</div>
              ) : null}
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

              <button
                type="submit"
                className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Update
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditAccount;
