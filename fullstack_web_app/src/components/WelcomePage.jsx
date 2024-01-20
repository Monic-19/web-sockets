import React from 'react'
import { motion } from "framer-motion"

const WelcomePage = () => {
  return (
    <motion.div    
    initial={{ opacity: 0, scale: 0, borderRadius: "60%" }}
    animate={{ opacity: 1, scale: 1, borderRadius: "0%" }}
    transition={{ ease: "anticipate", duration: "0.3" }}
     className='h-full w-[70%] bg-[#F3F3F4]'>
        <div className="bg-[#EDEDED] m-[4%] lg:m-[1%] h-[97%] w-[93%] lg:w-[97%] rounded-md shadow-lg relative p-1" >

          <div className="absolute bg-center bg-cover h-[45vh] w-[63vw] top-[25%] lg:left-[25%] lg:top-[17%] lg:h-[60vh] lg:w-[60vh] bg-no-repeat bg-[url('/assets/logo.jpeg')]"></div>

        </div>
    </motion.div>
  )
}

export default WelcomePage