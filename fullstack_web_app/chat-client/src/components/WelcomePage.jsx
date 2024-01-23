import React from 'react'
import { motion } from "framer-motion"

const WelcomePage = () => {
  const animationVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  }
  const screenWidth = window.innerWidth;

  if (screenWidth < 600) {
    animationVariants.initial.height = "0%";
    animationVariants.animate.height = "100%";
  } else {
    animationVariants.initial.borderRadius = "60%";
    animationVariants.animate.borderRadius = "0%";
  }
  return (
    <motion.div
    initial="initial"
    animate="animate"
    variants={animationVariants}
      transition={{ ease: "anticipate", duration: "0.3" }}
      className='h-full w-[70%] bg-[#F3F3F4]'>
      <div className="bg-[#EDEDED] m-[4%] lg:m-[1%] h-[97%] w-[93%] lg:w-[97%] rounded-md shadow-lg relative p-1" >

        <div className="absolute bg-center bg-cover h-[45vh] w-[63vw] top-[25%] lg:left-[25%] lg:top-[17%] lg:h-[60vh] lg:w-[60vh] bg-no-repeat bg-[url('/assets/logo.jpeg')]"></div>

      </div>
    </motion.div>
  )
}

export default WelcomePage