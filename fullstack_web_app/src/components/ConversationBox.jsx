import { IconButton } from '@mui/material'
import React from 'react'

const ConversationBox = () => {
  return (
    <div className='h-[16vh] my-[2vh] rounded-xl flex gap-4  w-[100%] flex-col items-center border-2 lg:ml-[2.5vw] lg:w-[80%] lg:p-3 lg:h-[10vh] lg:flex-row cursor-pointer'>

        <div className='h-[50px] w-[50px] bg-[#dadada] rounded-full mt-3 lg:mt-0  '>
            <img src="" alt="" />
        </div>
        <div>
            <h2 className=' font-bold text-[1.25vh] lg:text-[2vh] '>Sample Chat</h2>
            <h4 className=' text-gray-500 text-[1.1vh] text-center lg:text-left lg:text-sm mt-1'>Last Message</h4>
        </div>

    </div>
  )
}

export default ConversationBox