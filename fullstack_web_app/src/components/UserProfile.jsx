import React from 'react'
import { motion } from "framer-motion"

const UserProfile = () => {
    return (

        <motion.div initial={{ opacity: 0, scale: 0, borderRadius: "60%" }}
            animate={{ opacity: 1, scale: 1, borderRadius: "0%" }}
            exit={{ opacity: 0, scale: 0, borderRadius: "60%" }}
            transition={{ ease: "anticipate", duration: "0.3" }}
            className='h-full w-[70%] bg-[#F3F3F4]'>
        
        </motion.div>
    )
}

export default UserProfile