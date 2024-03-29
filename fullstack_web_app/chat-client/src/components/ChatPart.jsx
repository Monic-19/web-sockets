import React, { useEffect, useMemo, useRef, useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MessageOther from './MessageOther';
import MessageSelf from './MessageSelf';
import { AnimatePresence, motion } from "framer-motion"
import { useParams } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';
const ENDPOINT = "http://localhost:3000"
let socket;

const ChatPart = () => {

  const [content, setMessageContent] = useState("");
  const [allMessages, setAllMessages] = useState([]);
  const token = localStorage.getItem("token");
  const dyParams = useParams();
  const [chatId, chatUser] = dyParams.id ? dyParams.id.split('&') : [null, null];
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const userId = localStorage.getItem("user");

  const animationVariants = {
    initial: { opacity: 0, scale: 0 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  }
  const screenWidth = window.innerWidth;

  if (screenWidth < 600) {
    animationVariants.initial.height = "0%";
    animationVariants.animate.height = "100%";
  } else {
    animationVariants.initial.borderRadius = "60%";
    animationVariants.animate.borderRadius = "0%";
  }

  const scrollToBottom = () => {
    if (containerRef.current){
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  socket = useMemo( () => io(ENDPOINT), []) ;
  useEffect(() => {
    socket.emit("setup", userId);
    socket.on("connected", () => {
      // console.log("user is connected")
    })
    return () => {
      socket.disconnect();
    };
  }, [])

  useEffect(() => {
    socket.on('messageRecieved', (newMessage) => {
      setAllMessages([...allMessages, newMessage]);
      scrollToBottom();
    });
  }, [allMessages]);

  useEffect(() => {

    const fetchMessages = async () => {
      try {
        const response = await fetch(`http://localhost:3000/message/${chatId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch messages');
        }

        socket.emit('joinChat', chatId);
        const data = await response.json();

        const decryptedMessages = data.map(message => {
          const decryptedContent = CryptoJS.AES.decrypt(message.content, `2f9a5e1c8b3d7f6a9e2c5b8a1d4f7e0a3d1c8b5a9e3c7b1f6e0a2d9c4b7a1d`).toString(CryptoJS.enc.Utf8);
          return { ...message, content: decryptedContent };
        });
      

        setAllMessages(decryptedMessages);

      } catch (error) {
        console.error('Error fetching messages:', error.message);
      }
    };

    fetchMessages();

  },[allMessages, chatId ]);



  const handleSendMessage = async () => {
    try {
      const response = await fetch('http://localhost:3000/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content, chatId }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      scrollToBottom();
      const messageData = await response.json();
      socket.emit("newMessage", messageData)
      // console.log('Message sent successfully:', messageData);
      setMessageContent("");

    } catch (error) {
      console.error('Error sending message:', error.message);
    }
  };

  const exitGroup = async () => {
    try {
      const response = await fetch('http://localhost:3000/chat/exitGroup', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ chatId, userId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }

      const removedGroup = await response.json();
      // console.log('Group removed:', removedGroup);
      toast.success("You left the group.")
      navigate("/app/users")

    } catch (error) {
      console.error('Error exiting group:', error.message);

    }
  };

  function handleKeyDown(event){
    if(event.key == "Enter")
    handleSendMessage(); 
}


  return (
    <AnimatePresence>
      <motion.div
        initial="initial"
        animate="animate"
        variants={animationVariants}
        transition={{ ease: "anticipate", duration: "0.3" }}
        className='h-full w-[70%]'>

        <div className='w-full h-[7%]  lg:h-[10%] bg-white flex items-center '>

          <div className='w-[10%]'>
            <div
              className={`h-[35px] w-[35px] lg:h-[50px] lg:w-[50px] rounded-full ml-5 lg:mr-2 flex items-center justify-center bg-[#dadada] text-black`}
            >
              <h1 className='text-2xl'>{chatUser[0]}</h1>
            </div>
          </div>

          <div className='w-[80%] lg:ml-0 ml-9'>
            <div>
              <h2 className=' font-bold text-[1.5vh] lg:text-[2.5vh] '>{chatUser}</h2>
              <h1 className='text-gray-500 text-[1.25vh]  text- pb-1'>today</h1>
            </div>


          </div>

          <div className='w-[10%] mr-5'>
            {
              <IconButton onClick={exitGroup}><DeleteForeverIcon></DeleteForeverIcon></IconButton>
            }
          </div>

        </div>

        <div ref={containerRef} className=' w-full  h-[86%] bg-[#F3F3F4]  lg:h-[83%] overflow-y-scroll scroll-smooth '>
          {allMessages
            .slice(0)
            // .reverse()
            .map((message, index) => {
              const sender = message.sender;
              // console.log("sender is ", message.sender.name)
              const self_id = localStorage.getItem("user");
              if (sender._id === self_id) {
                return <MessageSelf props={message} key={index} />;
              } else {
                return <MessageOther props={message} key={index} />;
              }
            })}
        </div>


        <div className=' w-full h-[7%] flex items-center bg-white '>
          <input
            onChange={(e) => {
              setMessageContent(e.target.value);
            }}
            className="border-none outline-0 ml-4 w-[93%] text-sm lg:text-lg"
            type="text"
            placeholder="Type a message"
            value={content}
            onKeyDown={handleKeyDown}
          />

          <IconButton onClick={handleSendMessage}>
            <SendIcon ></SendIcon>
          </IconButton>
        </div>

      </motion.div>

    </AnimatePresence>
  )
}
export default ChatPart;