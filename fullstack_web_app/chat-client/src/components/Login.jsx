import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import {ToastContainer, toast} from "react-toastify";
import { useAuth } from '../stroe/auth';

const Login = () => {
    const constraintsRef = useRef(null);
    const navigate = useNavigate();
    const {stortokenInLS, storeUserInLS} = useAuth();

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError]  = useState(false);

    const formani = {
        initial: { rotate: "-40deg", opacity: 0 },
        animate: { rotate: "0deg", opacity: 1 },
        transition: { duration: 0.3, ease: "easeIn", delay: 0.6 },
    };

    const entani = {
        initial: { scale: 0.3, opacity: 0 },
        animate: { scale: 1, opacity: 1 },
        transition: { duration: 0.5, ease: "easeInOut" },
    };

    const handleLogin = async () => {
        try {
          const response = await fetch('http://localhost:3000/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
          });
      
          if (!response.ok) {
            setError(true);
            throw new Error('Login failed ');
          }
      
          const resData = await response.json();
        //   console.log(resData);
          storeUserInLS(resData._id);
          stortokenInLS(resData.token);
        //   localStorage.setItem("newtoken", resData.token);
        //   console.log("res token ", resData.token);
      
          navigate("/app/welcome");
        } catch (error) {
          console.error(error.message);
        }
      };
      


    return (

        <AnimatePresence>
            <motion.div ref={constraintsRef} className='h-[96vh] w-[92vw] lg:h-[92vh] lg:w-[95vw] flex flex-col lg:flex-row bg-[#F6FBFC] rounded-lg shadow-2xl overflow-hidden' >

                <div
                    className='w-[100%] h-[30%] lg:w-[40%] lg:h-[100%] flex  items-center justify-center'>

                    <motion.div {...entani}
                        drag dragConstraints={constraintsRef}
                        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                        whileTap={{ cursor: "grabbing", scale: 1.1 }}
                        className="cursor-grab rounded-lg bg-center bg-cover  h-[25vh] w-[25vh] lg:h-[50vh] lg:w-[50vh] bg-no-repeat bg-[url('/assets/logo.jpeg')]"></motion.div>

                </div>

                <section className=' w-[100%] h-[70%] lg:w-[60%] lg:h-[100%] flex  items-center justify-center overflow-hidden'>

                    <motion.div  {...entani} className="flex items-center justify-center  px-4 py-10 sm:px-6 sm:py-16 lg:px-8 z-10">

                        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">

                            <motion.h2 {...formani} className="text-2xl font-bold origin-left leading-tight text-black">Sign in to your account</motion.h2>
                            <motion.p {...formani} className="mt-2 text-base origin-left text-gray-600">
                                Don't have an account?{' '}
                                <a onClick={() => { navigate("/signup") }}
                                    href="#"
                                    title=""
                                    className="font-medium text-black transition-all duration-200 hover:underline"
                                >
                                    Create free account.
                                </a>

                            </motion.p>
                            {
                                error &&
                                <p className=' my-4 text-red-600'>Login <b>Failed</b>, check your credentials</p>
                            }

                            <div className="space-y-5 mt-2">
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Username{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            name='name'
                                            onChange={(e) => setName(e.target.value)}
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Username"
                                            id="name"
                                        ></input>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label htmlFor="password" className="text-base font-medium text-gray-900">
                                            {' '}
                                            Password{' '}
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            onChange={(e) => setPassword(e.target.value)}
                                            name='password'
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            id="password"
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        onClick={handleLogin}
                                        type="button"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 z-30"
                                    >
                                        Get Started <ArrowRightAltIcon className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>

                        </div>
                    </motion.div>
                </section>
                <ToastContainer></ToastContainer>
            </motion.div>
        </AnimatePresence>

    )
}

export default Login