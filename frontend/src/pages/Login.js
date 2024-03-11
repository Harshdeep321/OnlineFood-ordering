import React, { useState } from 'react'
import { ImUsers } from "react-icons/im";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRedux } from "../redux/userSlice"

const Login = () => {
  const navigate = useNavigate();

  const userData = useSelector(state => state);
  console.log(userData.user)

  const dispatch = useDispatch()

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
  });


  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((prev) => {
      return {
        ...prev,
        [name]: value
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { email, password } = data

    if (email && password) {
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login`, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataRes = await fetchData.json();
      console.log(dataRes);
      alert(dataRes.message);

      if (dataRes.alert) {
        dispatch(loginRedux(dataRes))
        navigate('/')
      }
      console.log(userData)
    } else {
      alert("Plese Enter required fields")
    }
  }

  return (
    <div className='p-3 md:p-4 mt-12'>
      <div className='flex flex-col max-w-sm bg-white m-auto p-4'>
        <div className='flex flex-row mt-2 m-auto'>
          <div className='w-10 text-4xl'>
            <ImUsers />
          </div>
          <div className='text-2xl font-bold'>Login Page</div>
        </div>

        <form className='w-full py-5 flex flex-col' onSubmit={handleSubmit}>

          <label htmlFor='email'>Email</label>
          <input
            type={'email'}
            id='email'
            name='email'
            className='mt-2 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor='password'>Password</label>
          <div className='flex px-2 py-1  bg-slate-200 rounded mt-2 mb-2 focus-within:outline focus-within:outline-blue-300'>
            <input
              type={showPassword ? "text" : 'password'}
              id='password'
              name='password'
              className='bg-slate-200 w-full border-none outline-none'
              value={data.password}
              onChange={handleOnChange}
            />
          
          </div>

          <button type='submit' className='w-full text-white max-w-[150px] m-auto bg-zinc-800 hover:bg-zinc-600 rounded-full text-xl font-medium text-center py-1 mt-4'>Login</button>
        </form>
        <p className='text-sm mt-2'>Don't have account ? <Link className='text-blue-400 underline' to={"/signup"}>Sign Up</Link></p>
      </div>
    </div>
  )
}

export default Login