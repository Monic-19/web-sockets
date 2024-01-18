import React from 'react'
import Sidebar from './Sidebar'
import ChatPart from './ChatPart'
import WelcomePage from './WelcomePage'
import CreateGroups from './CreateGroups'

const MainContainer = () => {
  return (
    <div className='h-[100vh] w-[100vw] lg:h-[92vh] lg:w-[95vw] flex'>
        <Sidebar></Sidebar>
        {/* <ChatPart></ChatPart> */}
        {/* <WelcomePage></WelcomePage> */}
        <CreateGroups></CreateGroups>
    </div>
  )
}

export default MainContainer
