import Form from '@/components/common/Form';
import { loginFormControls } from '@/config';
import { loginUser } from '@/store/auth-slice';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const intialState ={
  email : "",
  password : "",
}



const Register = () => {
const dispatch = useDispatch();
const navigate = useNavigate();

  const [formData,setFormData] =useState(intialState);

  const onSubmit= (e)=>{
    e.preventDefault();
     dispatch(loginUser(formData)).then((data)=>{
          if(data?.payload?.success) {
            toast.success(data?.payload?.message);
           if(data?.payload?.user?.role === "admin"){
            navigate("/admin/dashboard");
           }else{
            navigate("/shop/home");
           }
            setFormData(intialState) ;    
           }else{
            toast.error(data?.payload?.message);
            setFormData(intialState);
           }
        }); 
  }
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
      buttonText={"Log In"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default Register;