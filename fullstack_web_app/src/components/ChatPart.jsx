import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageOther from './MessageOther';
import MessageSelf from './MessageSelf';

const ChatPart = () => {
  return (
    <div className='h-full w-[70%]'>

      <div className='msgTop w-full h-[7%]  lg:h-[10%] bg-white flex items-center '>

        <div className='h-[50px] w-[50px] bg-[#dadada] rounded-full ml-5 lg:mr-2  flex items-center justify-center '>
          <h1 className='text-2xl '>N</h1>
        </div>

        <div className='ml-3'>
          <div>
            <h2 className=' font-bold text-[1.5vh] lg:text-[2.5vh] '>name</h2>
          </div>

          <h1 className='text-gray-500 text-[1.25vh]  text-right pb-1'>today</h1>
        </div>

        <div className='ml-[40%] lg:ml-[80%]'>
          <IconButton><DeleteIcon></DeleteIcon></IconButton>
        </div>

      </div>

      <div className=' w-full  h-[86%] bg-[#F3F3F4]  lg:h-[83%] overflow-y-scroll scroll-smooth'>
        <MessageOther></MessageOther>
        <MessageSelf></MessageSelf>
        <MessageOther></MessageOther>
        <MessageSelf></MessageSelf>
        <MessageOther></MessageOther>
        <MessageSelf></MessageSelf>

      </div>


      <div className=' w-full h-[7%] flex items-center bg-white '>
        <input
          className="border-none outline-0 ml-4 w-[93%] text-sm lg:text-lg"
          type="text"
          placeholder="Type a message"
        />
        <IconButton><SendIcon ></SendIcon></IconButton>
      </div>

    </div>
  )
}

export default ChatPart;