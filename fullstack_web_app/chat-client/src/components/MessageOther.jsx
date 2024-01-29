import React from 'react'
import { useParams } from 'react-router-dom';

const MessageOther = ({props}) => {
  const dyParams = useParams();
  const [chatId, chatUser] = dyParams.id ? dyParams.id.split('&') : [null, null];
  
  return (
    <div className=' w-[65vw] lg:w-[45vw] min-h-[7vh] m-[2vh] flex items-center ml-2 lg:ml-0'>
        <div className='hidden lg:flex h-[50px] w-[50px] bg-[#dadada] rounded-full m-2 items-center justify-center '>
          <h1 className='text-2xl '>{props.sender.name[0]}</h1>
        </div>

        <div className=' flex w-[85%] p-3 pl-4 flex-col bg-[#dadada] rounded-3xl'>
            <h4 className='text-sm lg:text-md'>{props.content}</h4>
            <p className='text-[12px] lg:text-sm ml-[75%] lg:ml-[90%] text-gray-600'><i>{props.sender.name}</i></p>
        </div>
    </div>
  )
}

export default MessageOther