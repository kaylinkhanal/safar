import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {useSelector} from 'react-redux'
import { useToast } from '@chakra-ui/react'
import styles from "../../styles/register.module.css"
const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    phoneNumber: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});


 const UserForm = () => {
     const {userDetails}= useSelector(state=>state.user)
  const toast = useToast()

     return(
  <div className={styles.form}>
    <Formik
      initialValues={userDetails}
      validationSchema={SignupSchema}
      onSubmit={(values,{resetForm}) => {
     
        resetForm()
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <Field name="fullName" placeholder="fullName" /> 
          {errors.fullName && touched.fullName ? (
            <div>{errors.fullName}</div>
          ) : null}<br/>
          <Field name="phoneNumber" placeholder="phoneNumber"/>
          {errors.phoneNumber && touched.phoneNumber ? (
            <div>{errors.phoneNumber}</div>
          ) : null}<br/>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
)}

export default UserForm


