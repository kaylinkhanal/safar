import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useToast } from '@chakra-ui/react'
import styles from "../../styles/register.module.css"
const SignupSchema = Yup.object().shape({
  productName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    productPrice: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required')
});


 const Register = () => {
  const toast = useToast()
   const handleRegister =async (values)=>{
    const res =  await fetch('http://localhost:3005/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    const data = await res.json()


   }
     return(
  <div className={styles.form}>

    <Formik
      initialValues={{
        productPrice: '',
        productName: '',
        password: '',
        productDescription: ''
      }}
      validationSchema={SignupSchema}
      onSubmit={(values,{resetForm}) => {
        handleRegister(values)
        resetForm()
      }}
    >
    
      {({ errors, touched }) => (
        <Form>
          <Field name="productName" placeholder="productName" /> 
          {errors.productName && touched.productName ? (
            <div>{errors.productName}</div>
          ) : null}<br/>
          <Field name="productPrice" placeholder="productPrice"/>
          {errors.productPrice && touched.productPrice ? (
            <div>{errors.productPrice}</div>
          ) : null}<br/>
          <Field name="productCategory" placeholder="productCategory" />
          {errors.productCategory && touched.productCategory ? <div>{errors.productCategory}</div> : null}
          <br/>
          <Field name="productDescription"  placeholder="productDescription" />
          {errors.productDescription && touched.productDescription ? <div>{errors.productDescription}</div> : null}
          <br/>
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  </div>
)}

export default Register


