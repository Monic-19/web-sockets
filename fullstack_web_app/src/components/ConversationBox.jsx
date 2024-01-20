import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

const ConversationBox = ({convo}) => {

 const navigate = useNavigate(); 

  return (
    <motion.div    
        initial={{x:"-100%", opacity : 0}}
        animate={{x:"0%", opacity: 1}}
        transition={{duration:0.7, ease:"linear", delay : 0.1}}
        onClick={() => {navigate("chat")}} className='h-[16vh] my-[2vh] rounded-xl flex gap-2  w-[100%] flex-col items-center border-2 lg:ml-[2.5vw] lg:w-[80%] lg:p-3 lg:h-[10vh] lg:flex-row cursor-pointer overflow-hidden hover:bg-gray-200 transition ease-in-out'>

        <div className='h-[50px] w-[50px] bg-[#dadada] rounded-full mt-3 lg:mr-2 lg:mt-0 flex items-center justify-center '>
            <h1 className='text-2xl '>{convo.name[0]}</h1>
        </div>
        <div className='lg:w-[55%]'>
            <h2 className=' font-bold text-[1.25vh] lg:text-[2vh] text-center lg:text-left '>{convo.name}</h2>
            <h4 className=' text-gray-500 text-[1.1vh] text-center px-1 lg:px-0 lg:text-left lg:text-sm mt-1'>{convo.lastMessage}</h4>
        </div>
        <div className=' lg:w-[20%]'>
            <h1 className='text-gray-500 text-[1.1vh]  lg:text-right text-center lg:mt-[75%] pb-1'>{convo.timeStamp}</h1>
        </div>

    </motion.div>
  )
}

export default ConversationBox