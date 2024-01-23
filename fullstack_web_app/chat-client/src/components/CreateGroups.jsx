import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { IconButton } from '@mui/material';
import { motion } from "framer-motion"

const CreateGroups = () => {
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
      className='h-full w-[70%] bg-[#F3F3F4] flex items-center justify-center'>

      <div className='bg-white w-[90%] h-[10%] rounded-md flex items-center flex-col p-3 lg:flex-row  shadow-xl'>
        <input className=' outline-0 border-none w-full p-1 text-lg lg:ml-3 text-center lg:text-left' type="text" placeholder='Enter group name...' />
        <IconButton>
          <DoneIcon></DoneIcon>
        </IconButton>
      </div>
    </motion.div>
  )
}

export default CreateGroups