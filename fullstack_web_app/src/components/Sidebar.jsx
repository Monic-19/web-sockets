import React, { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import ConversationBox from './ConversationBox';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const [conversations, setConversations] = useState([
        {
            name : "Monic",
            lastMessage : "Subh uth jana",
            timeStamp : "today",
        },
        {
            name : "Bansal",
            lastMessage : "BKL",
            timeStamp : "today",
        },
        {
            name : "Trauma",
            lastMessage : "Gonna Cry Today",
            timeStamp : "yesterday",
        },
    ])

    const navigate = useNavigate(); 

  return (
    <div className={'h-full w-[30%] bg-[#F3F3F4]'}>

        <div className={ ' mt-[10px] flex m-[6%] bg-white  rounded-md flex-col items-center lg:flex-row lg:justify-between lg:m-[2%] lg:p-3 lg:mt-[12px] shadow-md'}>

            <div className="left">
                <IconButton>
                <AccountCircleIcon className={ 'icons'}></AccountCircleIcon>
                </IconButton>
            </div>

            <div className="right flex flex-wrap pl-[10%] ">
                <IconButton onClick={ () => {navigate('users')}}><PersonAddAltIcon  className={ 'icons'}/></IconButton>

                <IconButton onClick={ () => {navigate('groups')}}><GroupAddIcon  className={ 'icons'}/></IconButton>

                <IconButton onClick={ () => {navigate('create-groups')}}><AddIcon  className={ 'icons'}/></IconButton>

                <IconButton onClick={ () => {navigate('welcome')}}>
                    <HomeIcon className={ 'icons'}/>
                    </IconButton>
            </div>
        </div>

        <div className={'bg-white rounded-md m-[6%] mt-[9%] flex items-center flex-col p-1 lg:flex-row lg:p-2 lg:mt-[4%] lg:m-[2%] shadow-md'}>
            <IconButton>
            <SearchIcon  className={ 'icons'}></SearchIcon>
            </IconButton>
            <input className=' outline-0 border-none w-full text-sm p-1 lg:text-lg lg:ml-3 text-center lg:text-left' type="text" placeholder='search'/>
        </div>

        <div className={' bg-white h-[74vh] lg:h-[70vh] rounded-md mt-[10%] m-[6%] p-3 overflow-y-scroll scroll-smooth lg:mt-[4%] lg:m-[2%] shadow-xl'}>
            <h3 className='m-[2%] text-md lg:text-lg ' >Chats..</h3>
            {
                conversations.map(  (convo, index) => (
                    <ConversationBox key={index} convo={convo} ></ConversationBox>
                ))
            }
        </div>
    </div>
  )
}

export default Sidebar