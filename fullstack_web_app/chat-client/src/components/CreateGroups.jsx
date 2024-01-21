import React from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { IconButton } from '@mui/material';
import { motion } from "framer-motion"

const CreateGroups = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, borderRadius: "60%" }}
      animate={{ opacity: 1, scale: 1, borderRadius: "0%" }}
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