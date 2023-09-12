import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {useSelector, useDispatch} from 'react-redux'
import { useToast } from '@chakra-ui/react'
import {changeUserDetails} from '../../redux/reducerSlices/userSlice'
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
    const dispatch =useDispatch()
  const toast = useToast()
  const fetchUserDetails = async()=>{
    const res =  await fetch('http://localhost:3005/users/'+ userDetails._id)
    const data  = await res.json()
    if(data){
      dispatch(changeUserDetails(data.userDetails))
    }
  }
  const   editUsersDetails=async(values)=>{
    const res =  await fetch('http://localhost:3005/account/'+ userDetails._id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    })
    const data = await res.json()
    if(res.status == 200){
      fetchUserDetails()

    }
  }
     return(
  <div className={styles.form}>
    <Formik
      initialValues={{phoneNumber:userDetails.phoneNumber, fullName:userDetails.fullName }}
      validationSchema={SignupSchema}
      onSubmit={(values,{resetForm}) => {
        editUsersDetails(values)
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


