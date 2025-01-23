import Form from '@/components/common/Form';
import { loginFormControls } from '@/config';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const intialState ={
  email : "",
  password : "",
}

const onSubmit= ()=>{
}

const Register = () => {
  const [formData,setFormData] =useState(intialState);

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground pb-1'>
          Login to your Account
        </h1>
        <p>Don't have an Account?
          <Link to = '/auth/register' className='text-blue-400 hover:underline ml-2'>
          signup</Link>
        </p>
      </div>
      <Form 
      formControls={loginFormControls} 
      buttonText={"Sign Up"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default Register;