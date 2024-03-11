import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineUserCircle } from "react-icons/hi";
import { BsCartFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { logoutRedux } from "../redux/userSlice"

const Header = () => {
    const [showMenu, setShowMenu] = useState(false);
    const userData = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const handleShowMenu = () => {
        setShowMenu(prev => !prev)
    }

    const handleLogout = () => {
        dispatch(logoutRedux())
        alert("Logout Successfully")
    }

    const cartItemNumber = useSelector((state) => state.product.cartItem)

    return (
        <header className='fixed shadow-md w-full h-20 px-2 md:px-4 z-50 bg-white'>
            {/* desktop  */}
            <div className='flex items-centre h-full justify-between'>
                <Link to={""}>
                    <div className='h-20'>
                        <img
                            src='data:image/jpeg;base64,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'
                            className='h-full'
                            alt=''
                        />
                    </div>
                </Link>
                <div className='flex items-center gap-5 md:gap-7'>
                    <nav className='gap-4 md:gap-6 text-base md:text-lg hidden md:flex'>
                        <Link to={""} className="font-medium hover:text-gray-600">Home</Link>
                        <Link to={"menu/65b675e16e7ea0f496b506a1"} className="font-medium hover:text-gray-600">Menu</Link>
                        <Link to={"about"} className="font-medium hover:text-gray-600">About</Link>
                        <Link to={"contact"} className="font-medium hover:text-gray-600">Contact</Link>
                    </nav>
                    <div className='text-2xl text-slate-600 relative'>
                        <Link to={"cart"}>
                            <BsCartFill />
                            <div className='absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-full m-0 p-0 text-sm text-center'>{cartItemNumber.length}</div>
                        </Link>
                    </div>
                    <div className='text-xl text-slate-600' onClick={handleShowMenu}>
                        <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
                            {userData.image ? (
                                <img
                                    src={userData.image}
                                    alt=''
                                    className="h-full w-full" />
                            ) : (
                                <HiOutlineUserCircle />
                            )}
                        </div>
                        {showMenu && (
                            <div className='absolute right-2 bg-white py-2 px-2 shadow drop-shadow-md flex flex-col'>
                                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                                    <Link
                                        to={"newproduct"}
                                        className='whitespace-nowrap text-base cursor-pointer'>
                                        New product
                                    </Link>
                                )}

                                {userData.firstName ? (
                                    <p
                                        className='whitespace-nowrap text-base cursor-pointer'
                                        onClick={handleLogout}
                                    >
                                        Logout ({userData.firstName}){" "}
                                    </p>
                                ) : (
                                    <Link
                                        to={"login"}
                                        className='whitespace-nowrap text-base cursor-pointer'>
                                        Login
                                    </Link>
                                )}

                                <nav className="text-base md:text-lg flex flex-col md:hidden">
                                    <Link to={""} className="px-2 py-1">
                                        Home
                                    </Link>
                                    <Link
                                        to={"menu/65b675e16e7ea0f496b506a1"}
                                        className="px-2 py-1"
                                    >
                                        Menu
                                    </Link>
                                    <Link to={"about"} className="px-2 py-1">
                                        About
                                    </Link>
                                    <Link to={"contact"} className="px-2 py-1">
                                        Contact
                                    </Link>
                                </nav>

                            </div>
                        )}

                    </div>
                </div>
            </div>



            {/* mobile */}
        </header >
    )
}

export default Header