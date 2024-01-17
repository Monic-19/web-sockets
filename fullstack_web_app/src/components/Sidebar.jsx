import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddIcon from '@mui/icons-material/Add';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';

import { IconButton } from '@mui/material';
import ConversationBox from './ConversationBox';

const Sidebar = () => {
  return (
    <div className=' h-full w-[30%] bg-[#F3F3F4] '>
        <div className='mt-[10px] flex m-[6%] bg-white  rounded-md flex-col items-center lg:flex-row lg:justify-between lg:m-[2%] lg:p-3 lg:mt-[12px]'>

            <div className="left">
                <IconButton>
                <AccountCircleIcon></AccountCircleIcon>
                </IconButton>
            </div>

            <div className="right flex flex-wrap pl-[10%]">
                <IconButton><PersonAddAltIcon></PersonAddAltIcon></IconButton>
                <IconButton><GroupAddIcon></GroupAddIcon></IconButton>
                <IconButton><AddIcon></AddIcon></IconButton>
                <IconButton><DarkModeIcon></DarkModeIcon></IconButton>
            </div>
        </div>

        <div className='bg-white rounded-md m-[6%] mt-[9%] flex items-center flex-col p-1 lg:flex-row lg:p-2 lg:mt-[4%] lg:m-[2%]'>
            <IconButton>
            <SearchIcon ></SearchIcon>
            </IconButton>
            <input className=' outline-0 border-none w-full text-sm p-1 lg:text-lg lg:ml-3 text-center lg:text-left' type="text" placeholder='search'/>
        </div>

        <div className='bg-white rounded-md mt-[10%] m-[6%] p-3 overflow-y-scroll scroll-smooth lg:mt-[4%] lg:m-[2%]'>
            <h3 className='m-[2%] text-md lg:text-lg'>Chats..</h3>
            <ConversationBox></ConversationBox>
            <ConversationBox></ConversationBox>
        </div>
    </div>
  )
}

export default Sidebar