import React, { useRef, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"

const Login = () => {
    const constraintsRef = useRef(null);
    const [newUser, setNewUser] = useState(true);
    function changeUser() {
        setNewUser((old) => !old);
    }

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
    return (

        <AnimatePresence>
            <motion.div ref={constraintsRef} className='h-[96vh] w-[92vw] lg:h-[92vh] lg:w-[95vw] flex flex-col lg:flex-row bg-[#F6FBFC] rounded-lg shadow-2xl'>

                <div
                    className='w-[100%] h-[50%] lg:w-[40%] lg:h-[100%] flex  items-center justify-center'>

                    <motion.div {...entani}
                        drag dragConstraints={constraintsRef}
                        dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                        whileTap={{ cursor: "grabbing", scale: 1.1 }}
                        className="cursor-grab rounded-lg bg-center bg-cover  h-[35vh] w-[35vh] lg:h-[50vh] lg:w-[50vh] bg-no-repeat bg-[url('/assets/logo.jpeg')]"></motion.div>

                </div>

                {
                    newUser &&

                    <motion.form
                        {...entani}
                        className='w-[90%] h-[50%] lg:w-[60%] m-5 lg:m-[2%] lg:h-[94%] flex items-center justify-center flex-col gap-8 rounded-3xl'>

                        <motion.h2 {...formani}
                            className='text-3xl origin-left'>Login to your Account</motion.h2>
                        <input
                            className="border-7 border-solid border-black outline-0 p-8 shadow-xl lg:p-4 w-[80%]  lg:w-[50%] h-[7%] text-md lg:text-lg"
                            type="text"
                            placeholder="Enter Username"
                        />
                        <input
                            className="border-none outline-0 p-8 lg:p-4 w-[80%]  lg:w-[50%]  h-[7%]  text-md lg:text-lg shadow-xl"
                            type="password"
                            placeholder="Enter Password"
                        />

                        <button className="bg-[#60C4E2] hover:bg-[#A9DCF2] text-white  font-bold py-2 px-8 border border-[#A9DCF2] rounded" >Login</button>

                        <h1 className='lg:text-xl'>Don't have an account ? <span onClick={changeUser} className='cursor-pointer hover:underline hover:font-bold duration-100 '>SignUp</span></h1>


                    </motion.form>

                }

                {
                    !newUser &&
                    <motion.form {...entani} className='w-[90%] h-[50%] lg:w-[60%] m-5 lg:m-[2%] lg:h-[94%] flex items-center justify-center flex-col gap-8 rounded-3xl'>

                        <motion.h2 {...formani} className='text-3xl origin-left'>Make a new Account</motion.h2>
                        <input
                            className="border-7 border-solid border-black outline-0 p-8 shadow-xl lg:p-4 w-[80%]  lg:w-[50%] h-[7%] text-md lg:text-lg"
                            type="text"
                            placeholder="Enter Username"
                        />
                        <input
                            className="border-7 border-solid border-black outline-0 p-8 shadow-xl lg:p-4 w-[80%]  lg:w-[50%] h-[7%] text-md lg:text-lg"
                            type="text"
                            placeholder="Enter Email"
                        />
                        <input
                            className="border-none outline-0 p-8 lg:p-4 w-[80%]  lg:w-[50%]  h-[7%]  text-md lg:text-lg shadow-xl"
                            type="password"
                            placeholder="Enter Password"
                        />

                        <button className="bg-[#60C4E2] hover:bg-[#A9DCF2] text-white  font-bold py-2 px-8 border border-[#A9DCF2] rounded" >SignUp</button>

                        <h1 className='lg:text-xl'>Already a User ? <span onClick={changeUser} className='cursor-pointer hover:underline hover:font-bold duration-100 '>Login</span></h1>


                    </motion.form>
                }
            </motion.div>
        </AnimatePresence>

    )
}

export default Login