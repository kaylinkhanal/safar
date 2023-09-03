import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
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


 const Register = () => {
  const toast = useToast()
   const handleRegister =async (values)=>{
    const res =  await fetch('http://localhost:3005/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    const data = await res.json()
    toast({
      title: data.msg,
      status: res.status==409 ? 'warning' : 'success',
      isClosable: true,
    })

   }
     return(
  <div className={styles.form}>
    <h1>Signup</h1>
    <Formik
      initialValues={{
        phoneNumber: '',
        fullName: '',
        password: '',
        confirmPassoword: ''
      }}
      validationSchema={SignupSchema}
      onSubmit={(values,{resetForm}) => {
        handleRegister(values)
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
          <Field name="password" type="password" placeholder="password" />
          {errors.password && touched.password ? <div>{errors.password}</div> : null}
          <br/>
          <Field name="confirmPassoword" type="password" placeholder="Confirm Passoword" />
          {errors.confirmPassoword && touched.confirmPassoword ? <div>{errors.confirmPassoword}</div> : null}
          <br/>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
)}

export default Register


