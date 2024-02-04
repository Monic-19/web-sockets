import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import CryptoJS from 'crypto-js';

const ConversationBox = ({ conversation }) => {

    const navigate = useNavigate();
    let [latestMessage, setLatestMessage] = useState(`No previous Messages, click here to start a new chat`);
    let sendit;
    const userId = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    const deleteChat = async (chatId) => {
        try {

            const response = await fetch('http://localhost:3000/chat/deleteChat', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ chatId }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete chat');
            }

            const result = await response.json();
            console.log('Chat deleted successfully:', result);
        } catch (error) {
            console.error('Error deleting chat:', error.message);
        }
    };

    const isGroupChat = conversation.isGroupChat;
    const usersCount = conversation.users.length;

    if (usersCount === 1 && isGroupChat) {
        const user = conversation.users[0];
        return (
            <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                transition={{ duration: 0.7, ease: "linear", delay: 0.1 }}
                onClick={() => navigate(`chat/${conversation._id}&${user.name}`)}
                className='h-[10vh] my-[2vh] rounded-xl flex gap-2 w-[100%] flex-col items-center border-2 lg:ml-[2.5vw] lg:w-[80%] lg:p-3 lg:h-[10vh] lg:flex-row cursor-pointer overflow-hidden hover:bg-[#4caf4f74] transition ease-in-out'>

                <div className='h-[30px] w-[30px] lg:h-[50px] lg:w-[50px] bg-[#4CAF4F] text-white rounded-full mt-3 lg:mr-2 lg:mt-0 flex items-center justify-center '>
                    <h1 className='lg:text-2xl text-sm'>{user.name[0]}</h1>
                </div>

                <div className='lg:w-[80%]'>
                    <h2 className='font-bold text-[1.25vh] lg:text-[2vh] text-center lg:text-left'>{conversation.chatName}</h2>
                    <h4 className='hidden lg:block w-[100%] h-[4vh] text-gray-500 text-[1.1vh] text-center px-1 lg:px-0 lg:text-left lg:text-[1.25vh] mt-1 overflow-scroll'>{latestMessage}</h4>
                </div>
            </motion.div>
        );
    }

    if (usersCount === 1 && !isGroupChat) {
        deleteChat(conversation._id);
        return null;
    }

    if (!isGroupChat) {
        if (conversation.latestMessage) {
            const otherUser = conversation.users.find(user => user._id !== userId);
            sendit = otherUser;
            const decryptedContent = CryptoJS.AES.decrypt(conversation.latestMessage.content,`2f9a5e1c8b3d7f6a9e2c5b8a1d4f7e0a3d1c8b5a9e3c7b1f6e0a2d9c4b7a1d`).toString(CryptoJS.enc.Utf8);
            latestMessage = decryptedContent;
        } else {
            const otherUser = conversation.users.find(user => user._id !== userId);
            sendit = otherUser;
        }

        return (
            <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                transition={{ duration: 0.7, ease: "linear", delay: 0.1 }}
                onClick={() => navigate(`chat/${conversation._id}&${sendit.name}`)}
                className='h-[10vh] my-[2vh] rounded-xl flex gap-2 w-[100%] flex-col items-center border-2 lg:ml-[2.5vw] lg:w-[80%] lg:p-3 lg:h-[10vh] lg:flex-row cursor-pointer overflow-hidden hover:bg-gray-200 transition ease-in-out'>

                <div className='h-[30px] w-[30px] lg:h-[50px] lg:w-[50px] bg-[#dadada] rounded-full mt-3 lg:mr-2 lg:mt-0 flex items-center justify-center '>
                    <h1 className='lg:text-2xl text-sm'>{sendit.name[0]}</h1>
                </div>

                <div className='lg:w-[80%]'>
                    <h2 className='lg:flex lg:items-baseline font-bold text-[1.25vh] lg:text-[2vh] lg:text-left'>{sendit.name}</h2>
                    <h4 className='lg:flex items-center hidden w-[100%] h-[4vh] text-gray-500 text-[1.1vh] text-center px-1 lg:px-0 lg:text-left lg:text-[1.25vh] mt-1 lg:mt-0 overflow-scroll'>{latestMessage}</h4>
                </div>
            </motion.div>
        );
    }

    // For group chats
    if (conversation.latestMessage) {
        const decryptedContent = CryptoJS.AES.decrypt(conversation.latestMessage.content,`2f9a5e1c8b3d7f6a9e2c5b8a1d4f7e0a3d1c8b5a9e3c7b1f6e0a2d9c4b7a1d`).toString(CryptoJS.enc.Utf8);
        latestMessage = decryptedContent;
    }

    return (
        <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={{ x: "0%", opacity: 1 }}
            transition={{ duration: 0.7, ease: "linear", delay: 0.1 }}
            onClick={() => navigate(`chat/${conversation._id}&${conversation.chatName}`)}
            className='h-[10vh] my-[2vh] rounded-xl flex gap-2 w-[100%] flex-col items-center border-2 lg:ml-[2.5vw] lg:w-[80%] lg:p-3 lg:h-[10vh] lg:flex-row cursor-pointer overflow-hidden hover:bg-[#4caf4f74] transition ease-in-out'>

            <div className='h-[30px] w-[30px] lg:h-[50px] lg:w-[50px] bg-[#4CAF4F] text-white rounded-full mt-3 lg:mr-2 lg:mt-0 flex items-center justify-center '>
                <h1 className='lg:text-2xl text-sm'>{conversation.chatName[0]}</h1>
            </div>

            <div className='lg:w-[80%]'>
                <h2 className='font-bold text-[1.25vh] lg:text-[2vh] text-center lg:text-left'>{conversation.chatName}</h2>
                <h4 className='hidden lg:block w-[100%] h-[4vh] text-gray-500 text-[1.1vh] text-center px-1 lg:px-0 lg:text-left lg:text-[1.25vh] mt-1 overflow-scroll'>{latestMessage}</h4>
            </div>
        </motion.div>
    );




}

export default ConversationBox