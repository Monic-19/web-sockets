import React, { useRef } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import EmailIcon from '@mui/icons-material/Email';
import GoogleIcon from '@mui/icons-material/Google';

const Signup = () => {
    const constraintsRef = useRef(null);
    const navigate = useNavigate();

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

    const dragy = {
        dragConstraints: constraintsRef,
        dragTransition: { bounceStiffness: 600, bounceDamping: 20 },
    }



    return (
        <motion.div ref={constraintsRef} className='h-[96vh] w-[92vw] lg:h-[92vh] lg:w-[95vw] flex flex-col lg:flex-row bg-[#F6FBFC] rounded-lg shadow-2xl'>

            <div
                className='w-[100%] h-[35%] lg:w-[40%] lg:h-[100%] flex  items-center justify-center'>

                <motion.div {...entani} drag {...dragy}

                    whileTap={{ cursor: "grabbing", scale: 0.8 }}
                    className="cursor-grab rounded-lg bg-center bg-cover  h-[25vh] w-[25vh] lg:h-[50vh] lg:w-[50vh] bg-no-repeat bg-[url('/assets/logo.jpeg')] z-50"></motion.div>

            </div>

            <section className=' w-[100%] h-[65%] lg:w-[60%] lg:h-[100%] flex  items-center justify-center overflow-hidden'>

                <motion.div  {...entani} className="flex items-center justify-center  px-4 py-10 sm:px-6 sm:py-16 lg:px-8">

                    <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
               
                        <motion.h2 {...formani}  className="text-2xl font-bold origin-left leading-tight text-black">Sign up to create account</motion.h2>
                        <motion.p {...formani}  className="mt-2 text-base origin-left text-gray-600">
                            Already have an account?{' '}
                            <a onClick={() => {navigate("/")}}
                                href="#"
                                title=""
                                className="font-medium text-black transition-all duration-200 hover:underline"
                            >
                                Login In
                            </a>
                        </motion.p>
                        <form action="#" method="POST" className="mt-8">
                            <div className="space-y-5">
                                <div>
                                    <label htmlFor="name" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Username{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="text"
                                            placeholder="Username"
                                            id="name"
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-base font-medium text-gray-900">
                                        {' '}
                                        Email address{' '}
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="email"
                                            placeholder="Email"
                                            id="email"
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
                                            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                                            type="password"
                                            placeholder="Password"
                                            id="password"
                                        ></input>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="button"
                                        className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80 z-30"
                                    >
                                        Create Account <ArrowRightAltIcon className="ml-2" size={16} />
                                    </button>
                                </div>
                            </div>
                        </form>
                        <div className="mt-3 space-y-3">
                            <button
                                type="button"
                                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                            >
                                <span className="mr-2 inline-block">
                                  <GoogleIcon></GoogleIcon>
                                </span>
                                Sign up with Google
                            </button>
                            <button
                                type="button"
                                className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
                            >
                                <span className="mr-2 inline-block">
                                   <EmailIcon></EmailIcon>
                                </span>
                                Sign up with Email
                            </button>
                        </div>
                    </div>
                </motion.div>
            </section>


        </motion.div>
    )
}

export default Signup