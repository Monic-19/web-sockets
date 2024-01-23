import { IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { motion, AnimatePresence } from "framer-motion"

const Users = () => {
    const animationVariants = {
        initial:{ opacity: 0, scale: 0 },
        animate:{ opacity: 1, scale: 1 },
        exit:{ opacity: 0, scale: 0},
    }
    const screenWidth = window.innerWidth;

    if (screenWidth < 600) {
        animationVariants.initial.height = "0%";
        animationVariants.animate.height = "100%";
      } else {
        animationVariants.initial.borderRadius = "60%";
        animationVariants.animate.borderRadius = "0%";
      }
    

    useEffect( () => {
        console.log("users refershed")
    } )

    return (
        <AnimatePresence>
            <motion.div
                key={"userPage"}
                variants={animationVariants}
                initial="initial"
                animate="animate"
                transition={{ ease: "anticipate", duration: "0.3" }}
                className='h-full w-[70%] bg-[#F3F3F4]'>

                <div className='mt-[10px] flex m-[6%] bg-white  rounded-md flex-col items-center lg:flex-row  lg:m-[2%] lg:p-3 lg:mt-[12px] shadow-md'>

                    <div className="left m-2 lg:m-0 h-[7vh] w-[7vh] lg:h-[5vh] lg:w-[5vh] bg-cover bg-no-repeat bg-[url('/assets/logo.jpeg')]">
                    </div>

                    <h1 className="right pl-[2%] m-2 lg:m-0 font-bold text-gray-500">
                        Online Users
                    </h1>
                </div>

                <div className='bg-white rounded-md mx-[6%] -mt-[2.3%] flex items-center flex-col p-1 lg:flex-row lg:p-2 lg:-mt-[0.3%] lg:m-[2%] shadow-md'>
                    <IconButton>
                        <SearchIcon ></SearchIcon>
                    </IconButton>
                    <input className=' outline-0 border-none w-full text-sm p-1 lg:text-lg lg:ml-3 text-center lg:text-left' type="text" placeholder='search' />
                </div>

                <div className=' h-[74vh] lg:h-[70vh] rounded-md mt-[4%] m-[6%] p-3 overflow-y-scroll scroll-smooth lg:mt-[2%] lg:m-[2%] flex flex-col items-center'>

                    <div className='user w-[90%] lg:w-[40%] h-[5vh] lg:h-[10vh] rounded-full bg-white lg:p-4  flex justify-center lg:justify-normal items-center cursor-pointer shadow-lg mb-[4vh]   hover:scale-105'>

                        <div className='hidden lg:flex h-[50px] w-[50px] bg-[#dadada] rounded-full m-2 items-center justify-center '>
                            <h1 className='text-2xl '>N</h1>
                        </div>
                        <div>
                            <h2 className=' font-bold lg:ml-4 text-[1.5vh] lg:text-[2.5vh] text-gray-500 '>User name</h2>
                        </div>

                    </div>


                </div>
            </motion.div>

        </AnimatePresence>
    )
}

export default Users