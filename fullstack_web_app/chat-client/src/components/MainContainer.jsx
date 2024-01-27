import React from 'react'
import Sidebar from './Sidebar'
import { Outlet } from 'react-router-dom'

const MainContainer = () => {
  return (
    <div className='h-[100vh] w-[100vw] lg:h-[92vh] lg:w-[95vw] flex overflow-hidden'>
        <Sidebar/>
        <Outlet/>


        {/* <WelcomePage></WelcomePage> */}
        {/* <ChatPart></ChatPart> */}
        {/* <CreateGroups></CreateGroups> */}
        {/* <UserAndGroups></UserAndGroups> */}
    </div>
  )
}

export default MainContainer
