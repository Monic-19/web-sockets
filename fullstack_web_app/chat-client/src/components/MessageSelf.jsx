import React from 'react'

const MessageSelf = ({props}) => {
  return (
    <div className='bg-[rgb(157,232,200)] min-h-[7vh] p-3 pl-4 rounded-3xl max-w-[50vw] lg:w-[45vw] mt-[2vh] ml-[20%] lg:ml-[30%]'>
        <div className=' text-sm lg:text-md'>{props.content}</div>
        <p className='text-sm text-[12px] lg:text-sm  ml-[85%] lg:ml-[95%] text-gray-600'><i>me</i></p>
    </div>
  )
}

export default MessageSelf