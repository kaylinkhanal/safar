import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";

const VehicleSchema = Yup.object().shape({
  vehicleType: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  vehicleFare: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const index = () => {
  const toast = useToast();

  const handleRegister = async (values) => {
    debugger;
    const res = await fetch("http://localhost:3005/vehicletype", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const data = await res.json();

    toast({
      title: data.msg,
      status: res.status == 409 ? "warning" : "success",
      isClosable: true,
    });
  };
  return (
    <div>
      <Formik
        initialValues={{
          vehicleType: "",
          vehicleFare: "",
        }}
        validationSchema={VehicleSchema}
        onSubmit={(values, { resetForm }) => {
          handleRegister(values);
          resetForm();
        }}
      >
        {({ errors, touched }) => (
          <Form className="space-y-4 md:space-y-6">
            <div>
              <label
                for="vehicleType"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Vehicle Type
              </label>
              <Field
                name="vehicleType"
                placeholder="vehicleType"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            {errors.vehicleType && touched.vehicleType ? (
              <div>{errors.vehicleType}</div>
            ) : null}
            <div>
              <label
                for="vehicleFare"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Vehicle Fare per Meter
              </label>
              <Field
                name="vehicleFare"
                placeholder="vehicleFare"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            {errors.vehicleFare && touched.vehicleFare ? (
              <div>{errors.vehicleFare}</div>
            ) : null}

            <button
              type="submit"
              className="w-full text-white bg-gray-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Add Vehicle Type
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default index;
