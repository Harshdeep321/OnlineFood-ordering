import React, { useState } from 'react'
import { ImUsers } from "react-icons/im";
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    });

    const handleShowPassword = () => {
        setShowPassword(prev => !prev);
    };

    const handleOnChange = (e) => {
        const {name,value} = e.target
        setData((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { firstName, email, password } = data;
    
        if (firstName && email && password) {
            try {
                const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json",
                    },
                    body: JSON.stringify(data),
                });
    
                const dataRes = await fetchData.json();
                console.log(dataRes);
                alert(dataRes.message);

                if(dataRes.alert){
                    navigate('/login')
                }
            } catch (error) {
                console.error("Fetch error:", error);
                alert("Failed to connect to the server. Please try again later.");
            }
        } else {
            alert("Please enter all fields");
        }
    };
    

    return (
        <div className='p-3 md:p-4 mt-12'>
            <div className='flex flex-col max-w-sm bg-white m-auto p-4'>
                <div className='flex flex-row mt-2 m-auto'>
                    <div className='w-10 text-4xl'>
                        <ImUsers />
                    </div>
                    <div className='text-2xl font-bold'>Sign Up</div>
                </div>

                <form className='w-full py-5 flex flex-col' onSubmit={handleSubmit}>
                    <label htmlFor='firstName'>First Name</label>
                    <input
                        type={'text'}
                        id='firstName'
                        name='firstName'
                        className='mt-2 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
                        value={data.firstName}
                        onChange={handleOnChange}
                    />

                    <label htmlFor='lastName'>Last Name</label>
                    <input
                        type={'text'}
                        id='lastName'
                        name='lastName'
                        className='mt-2 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300'
                        value={data.lastName}
                        onChange={handleOnChange}
                    />

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
                        <span onClick={handleShowPassword} className='flex text-xl cursor-pointer'>{showPassword ? <BiShow /> : <BiHide />}</span>
                    </div>

                    <button type='submit' className='w-full text-white max-w-[150px] m-auto bg-zinc-800 hover:bg-zinc-600 rounded-full text-xl font-medium text-center py-1 mt-4'>Sign Up</button>
                </form>
                <p className='text-sm mt-2'>Already have account ? <Link className='text-blue-400 underline' to={"/login"}>Login</Link></p>
            </div>
        </div>
    )
}

export default Signup