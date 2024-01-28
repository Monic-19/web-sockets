import React, { useEffect, useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddIcon from '@mui/icons-material/Add';
import HideSourceIcon from '@mui/icons-material/HideSource';
import HomeIcon from '@mui/icons-material/Home';
import { IconButton } from '@mui/material';
import ConversationBox from './ConversationBox';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {

    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    // console.log("all conversations -> ", conversations)
    const [convotype, setConvotype] = useState("all");

    const filteredConversations = conversations.filter(conversation => {
        if (convotype === 'all') {
          return true;
        } 
        else if (convotype === 'hide') {
            return false;
        }
        else{
            return conversation.isGroupChat === (convotype === 'group');
        }
      });

    useEffect(() => {
        const fetchConvo = async () => {
            try {
                const response = await fetch('http://localhost:3000/chat/', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!response.ok) {
                    navigate("/")
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();
                setConversations(data);
                // console.log("User data : ", data)

            } catch (error) {
                console.error('Error fetching profile data:', error.message);
            }
        };
        fetchConvo();
    }, [convotype])

    return (
        <div className={'h-full w-[30%] bg-[#F3F3F4] z-20'}>

            <div className={' mt-[10px] flex m-[6%] bg-white  rounded-md flex-col items-center lg:flex-row lg:justify-between lg:m-[2%] lg:p-3 lg:mt-[12px] shadow-md'}>

                <div className="left">
                    <IconButton onClick={() => { navigate('profile') }}>
                        <AccountCircleIcon className={'icons'}></AccountCircleIcon>
                    </IconButton>
                </div>

                <div className="right flex flex-wrap pl-[10%] ">
                    <IconButton onClick={() => { navigate('users') }}><PersonAddAltIcon className={'icons'} /></IconButton>

                    <IconButton onClick={() => { navigate('groups') }}><GroupAddIcon className={'icons'} /></IconButton>

                    <IconButton onClick={() => { navigate('create-groups') }}><AddIcon className={'icons'} /></IconButton>

                    <IconButton onClick={() => { navigate('welcome') }}>
                        <HomeIcon className={'icons'} />
                    </IconButton>
                </div>
            </div>

            <div className={'bg-white rounded-md m-[6%] mt-[9%] flex lg:flex-nowrap flex-wrap items-center justify-evenly flex-col p-3 lg:flex-row lg:p-3 lg:mt-[4%] lg:m-[2%] shadow-md'}>
           
                <button
                    type="button"
                    className="rounded-md border border-black px-2 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black w-[20vw] lg:text-lg lg:mb-0 mb-2 lg:w-[5.5vw]"
                    onClick={() => setConvotype("chat")}
                >
                    Chats
                </button>
                <button
                    type="button"
                    className="rounded-md border border-black px-2 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black w-[20vw] lg:text-lg lg:mb-0 mb-2 lg:w-[5.5vw]"
                    onClick={() => setConvotype("group")}
                >
                    Groups
                </button>
                <button
                    type="button"
                    className="rounded-md border border-black px-2 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black w-[20vw] lg:text-lg lg:mb-0 mb-2 lg:w-[5.5vw]"
                    onClick={() => setConvotype("all")}
                >
                    ALL
                </button>
                <button
                    type="button"
                    className="rounded-md border border-black px-2 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black w-[20vw] lg:text-lg lg:mb-0 mb-2 lg:w-[5.5vw]"
                    onClick={() => setConvotype("hide")}
                >
                    <HideSourceIcon></HideSourceIcon>
                </button>
               
            </div>

            <div className={' bg-white h-[74vh] lg:h-[70vh] rounded-md mt-[10%] m-[6%] p-3 overflow-y-scroll scroll-smooth lg:mt-[4%] lg:m-[2%] shadow-xl'}>
                <div className=''>{
                    filteredConversations.map((conversation) => (
                        <ConversationBox key={conversation._id} conversation={conversation}></ConversationBox>
                    ))}
                </div>

            </div>

        </div>

    )
}

export default Sidebar