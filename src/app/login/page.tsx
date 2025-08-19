'use client'

import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import api from '@/lib/api'
import toast from 'react-hot-toast'


const schema = yup.object().shape({
  email: yup.string().required('Email is required').email('Enter a valid email address'),
  password: yup.string().required('Password is required').min(8, "Password must be atleast 8 characters")
})

type LoginFormData = yup.InferType<typeof schema>


const Login = () => {

    // const {
    //     register,
    //     handleSubmit,
    //     formState: {errors} 
    // } = useForm({
    //     resolver: yupResolver(schema)
    // })


    // const onSubmit = async(data: LoginFormData) => {

    //     await api.post('/api/users/login',data,{
    //         headers:{
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     .then(async( res)=> {

    //         toast.success('Login successfull')
    //          localStorage.setItem('token', res.data.access_token)
    //          localStorage.setItem('user',JSON.stringify(res.data.data))

            
    //     }).catch((err) =>{
    //         toast.error(err.response?.data?.message || 'Invalid Credentials')
    //     })
    // }
  return (
    <div>
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white/90 p-8 shadow-2xl backdrop-blur">
        {/* Title */}
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Welcome Back 👋
        </h2>
        <p className="mb-8 text-center text-gray-500">
          Login to continue exploring amazing tours
        </p>

        {/* Form */}
        <form className="space-y-5" 
        // onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
            // {...register('email')}
              type="email"
              id="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-gray-300 p-3 focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:outline-none"
            />
            {/* {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>} */}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
                // {...register('password')}
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full rounded-xl border border-gray-300 p-3 focus:border-indigo-500 focus:ring focus:ring-indigo-300 focus:outline-none"
            />
            {/* {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>} */}
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-400"
              />
              Remember me
            </label>
            <a href="#" className="text-indigo-600 hover:underline">
              Forgot password?
            </a>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-sm text-gray-500">or</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social login (optional design only) */}
        <div className="flex gap-4">
          <button className="flex-1 rounded-xl border border-gray-300 py-2 font-medium text-gray-600 hover:bg-gray-100">
            Google
          </button>
          <button className="flex-1 rounded-xl border border-gray-300 py-2 font-medium text-gray-600 hover:bg-gray-100">
            Facebook
          </button>
        </div>

        {/* Signup link */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a href="/auth/register" className="text-indigo-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
    </div>
  )
}

export default Login