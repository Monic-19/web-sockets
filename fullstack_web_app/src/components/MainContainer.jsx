import React from 'react'
import Sidebar from './Sidebar'
import ChatPart from './ChatPart'

const MainContainer = () => {
  return (
    <div className='h-[100vh] w-[100vw] lg:h-[92vh] lg:w-[95vw] flex'>
        <Sidebar></Sidebar>
        <ChatPart></ChatPart>
    </div>
  )
}

export default MainContainer
