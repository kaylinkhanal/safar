import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { editVehicleDetails } from "../../../../redux/reducerSlices/vehicleSlice";

const EditVehicleSchema = Yup.object().shape({
  vehicleType: Yup.string().required("Required"),
  pricePerKm: Yup.number().required("Required"),
  basePrice: Yup.number().required("Required"),
  iconUrl: Yup.string(),
});

export default function EditVehicle() {
  const router = useRouter();
  const _id = router.query.id;
  const { vehicleDetails } = useSelector((state) => state.vehicle);

  const dispatch = useDispatch();

  const fetchVehicleDetails = async () => {
    try {
      const res = await fetch(`http://localhost:3005/vehicles/` + _id);
      if (res.status === 200) {
        const data = await res.json();
        if (data) {
          dispatch(editVehicleDetails(data.vehicleDetails));
        }
      } else {
        console.error("Failed to fetch vehicle details");
      }
    } catch (error) {
      console.error("An error occurred while fetching vehicle details:", error);
    }
  };

  const changeVehicleDetails = async (values) => {
    try {
      const res = await fetch(`http://localhost:3005/vehicles/` + _id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.status === 200) {
        fetchVehicleDetails();
      } else {
        console.error("Failed to update vehicle details");
      }
    } catch (error) {
      console.error("An error occurred while updating vehicle details:", error);
    }
  };

  useEffect(() => {
    fetchVehicleDetails();
  }, [_id]);

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Edit vehicle
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <Formik
            initialValues={{
              vehicleType: vehicleDetails.vehicleType,
              pricePerKm: vehicleDetails.pricePerKm,
              basePrice: vehicleDetails.basePrice,
              iconUrl: vehicleDetails.iconUrl,
            }}
            validationSchema={EditVehicleSchema}
            onSubmit={async (values) => {
              await changeVehicleDetails(values);
              router.push("/admin/vehicle");
            }}
          >
            {({ errors, touched }) => (
              <Form className="space-y-6" method="post">
                <div>
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Vehicle Type
                  </label>
                  <Field
                    name="vehicleType"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.vehicleType && touched.vehicleType ? (
                    <div>{errors.vehicleType}</div>
                  ) : null}
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Price Per Km
                  </label>
                  <Field
                    name="pricePerKm"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.pricePerKm && touched.pricePerKm ? (
                    <div>{errors.pricePerKm}</div>
                  ) : null}
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Base Price
                  </label>
                  <Field
                    name="basePrice"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.basePrice && touched.basePrice ? (
                    <div>{errors.basePrice}</div>
                  ) : null}
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Icon URL
                  </label>
                  <Field
                    name="iconUrl"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />

                  <button
                    type="submit"
                    className="mt-5 flex w-full justify-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Update
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
