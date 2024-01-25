import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"

const ConversationBox = ({ conversation }) => {

    const navigate = useNavigate();

    if (conversation.users.length === 1) {
        return <div key={index}></div>;
    }


    if (conversation.latestMessage === undefined) {
        return (
            <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                transition={{ duration: 0.7, ease: "linear", delay: 0.1 }}
                onClick={() => { navigate(`chat/${conversation._id}&${conversation.users[1].name}`) }} 
                className='h-[10vh] my-[2vh] rounded-xl flex gap-2  w-[100%] flex-col items-center border-2 lg:ml-[2.5vw] lg:w-[80%] lg:p-3 lg:h-[10vh] lg:flex-row cursor-pointer overflow-hidden hover:bg-gray-200 transition ease-in-out'>

                <div className='h-[30px] w-[30px] lg:h-[50px] lg:w-[50px] bg-[#dadada] rounded-full mt-3 lg:mr-2 lg:mt-0 flex items-center justify-center '>
                    <h1 className='lg:text-2xl text-sm'>{conversation.users[1].name[0]}</h1>
                </div>
                <div className='lg:w-[80%]'>
                    <h2 className=' font-bold text-[1.25vh] lg:text-[2vh] text-center lg:text-left '>{conversation.users[1].name}</h2>

                    <h4 className='hidden lg:block w-[100%] h-[4vh] text-gray-500 text-[1.1vh] text-center px-1 lg:px-0 lg:text-left lg:text-[1.25vh] mt-1 overflow-scroll'> No previous Messages,<br /> click here to start a new chat</h4>
                </div>

            </motion.div>
        )
    }
    else{
        <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: "0%", opacity: 1 }}
        transition={{ duration: 0.7, ease: "linear", delay: 0.1 }}
        onClick={() => { navigate(`chat/${conversation._id}&${conversation.users[1].name}`) }} 
        className='h-[10vh] my-[2vh] rounded-xl flex gap-2  w-[100%] flex-col items-center border-2 lg:ml-[2.5vw] lg:w-[80%] lg:p-3 lg:h-[10vh] lg:flex-row cursor-pointer overflow-hidden hover:bg-gray-200 transition ease-in-out'>

        <div className='h-[30px] w-[30px] lg:h-[50px] lg:w-[50px] bg-[#dadada] rounded-full mt-3 lg:mr-2 lg:mt-0 flex items-center justify-center '>
            <h1 className='lg:text-2xl text-sm'>{conversation.users[1].name[0]}</h1>
        </div>
        <div className='lg:w-[55%]'>
            <h2 className=' font-bold text-[1.25vh] lg:text-[2vh] text-center lg:text-left '>{conversation.users[1].name}</h2>

            <h4 className='hidden lg:block text-gray-500 text-[1.1vh] text-center px-1 lg:px-0 lg:text-left lg:text-sm mt-1'>{conversation.latestMessage.content.length > 30 ? `${conversation.latestMessage.content.match(/.{1,40}/g)}...`: conversation.latestMessage.content}</h4>
        </div>
        <div className=' lg:w-[20%]'>
            <h1 className='text-gray-500 text-[1.1vh] lg:text-right text-center -mt-2 lg:mt-[75%] pb-1'>{conversation.timeStamp}</h1>
        </div>

    </motion.div>
    }
}

export default ConversationBox