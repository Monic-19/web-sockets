import React from 'react'

const MessageOther = () => {
  return (
    <div className=' w-[65vw] lg:w-[45vw] min-h-[7vh] mt-[2vh] flex items-center ml-2 lg:ml-0'>
        <div className='hidden lg:flex h-[50px] w-[50px] bg-[#dadada] rounded-full m-2 items-center justify-center '>
          <h1 className='text-2xl '>N</h1>
        </div>

        <div className=' flex w-[85%] p-3 pl-4 flex-col bg-[#dadada] rounded-3xl'>
            <h4 className='text-sm lg:text-md'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Delectus tenetur ullam esse facilis itaque nisi a in deserunt, sed cum qui ipsum. Mollitia eum excepturi aliquid nobis aspernatur magni non!</h4>
            <p className='text-[12px] lg:text-sm ml-[73%] lg:ml-[88%] text-gray-600'>12.00am</p>
        </div>
    </div>
  )
}

export default MessageOther