import React, { useEffect, useState } from 'react'
import DoneIcon from '@mui/icons-material/Done';
import { IconButton } from '@mui/material';
import { AnimatePresence, motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';

const CreateGroups = () => {

  const [groupName, setGroupName] = useState("");
  const [userIds, setUserIds] = useState([]);
  const [usernames, setUserNames] = useState([]);
  const [totalUsers, setUsers] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const variants = {
    hover: {
      fontWeight: 900,
      scale: 1.1,
      transition: {
        duration: 0.03,
        ease: 'easeInOut',
      },
    },
    tap: {
      scale: 0.9,
      transition: {
        duration: 0.03,
        ease: 'easeInOut',
      },
    },
  };

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

  const toggleUserId = (userId) => {
    setUserIds((prevIds) =>
      prevIds.includes(userId)
        ? prevIds.filter((id) => id !== userId)
        : [...prevIds, userId]
    );
  };

  const toggleUserName = (name) => {
    setUserNames((prevIds) =>
      prevIds.includes(name)
        ? prevIds.filter((oldname) => oldname !== name)
        : [...prevIds, name]
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/fetchUsers', {
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
        setUsers(data);
        // console.log("User data : ", data)

      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };
    fetchData();
  }, [])

  async function createGroup() {
    if (!groupName) {
      alert('Please provide both group name and user list.');
      return;
    }

    try {

      const response = await fetch('http://localhost:3000/chat/createGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: groupName,
          users: JSON.stringify(userIds),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create group');
      }

      const groupChat = await response.json();
      navigate("/app/groups");
      // console.log('Group chat created:', groupChat);

    } catch (error) {
      console.error('Error creating group chat:', error.message);
    }

  }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={animationVariants}
      transition={{ ease: "anticipate", duration: "0.3" }}
      className='h-full w-[70%] bg-[#F3F3F4] flex flex-col items-center'>

      <div className='bg-white w-[80%] h-[10%] rounded-md flex items-center flex-col p-3 lg:flex-row  shadow-xl mt-[10%]'>

        <input
          onChange={(e) => { setGroupName(e.target.value) }}
          className=' outline-0 border-none w-full p-1 text-lg lg:ml-3 text-center lg:text-left'
          type="text"
          placeholder='Enter group name...' />

        <IconButton onClick={createGroup}>
          <DoneIcon></DoneIcon>
        </IconButton>
      </div>

      <div className='bg-white w-[80%] min-h-[10%] max-h-[30%] lg:max-h-[50%] rounded-md flex flex-col p-3 lg:flex-row  shadow-xl mt-4'>
        <h1 className='lg:ml-3 lg:w-[25%] w-[100%] font-extrabold flex justify-center items-center'>Total Users <span> - {totalUsers.length}</span></h1>

        <div className='w-[75%] flex  items-center flex-wrap overflow-scroll'>
          {
            totalUsers.map((user) => (
              <motion.p
                className='lg:ml-1 px-2 py-1 lg:text-md ml-[30%]  cursor-pointer'
                whileHover="hover"
                whileTap="tap"
                variants={variants}
                onClick={() => { toggleUserId(user._id); toggleUserName(user.name) }}
                key={user._id}>{user.name}</motion.p>
            ))
          }

        </div>
      </div>

      {
        usernames.length > 0 &&
        <AnimatePresence>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{duration : 0.2, ease : "easeIn"}}
            className='bg-white w-[80%] min-h-[10%] lg:max-h-[50%] max-h-[30%] rounded-md flex flex-col p-3 lg:flex-row  shadow-xl mt-4'>
            <h1 className='lg:ml-3 lg:w-[25%] w-[100%] font-extrabold flex justify-center items-center'>Added Users <span> - {usernames.length}</span></h1>

            <div className='w-[75%] flex  items-center flex-wrap overflow-scroll'>
              {
                usernames.map((user,index) => (
                  <motion.p
                    className='lg:ml-1 px-2 py-1 lg:text-md ml-[30%]  cursor-pointer'
                    key={index}>{user}</motion.p>
                ))
              }

            </div>
          </motion.div>
        </AnimatePresence>
      }

      {/* <input type="text" value={usernames} onChange={(e) => setUsernames(e.target.value)} /> */}
    </motion.div>
  )
}

export default CreateGroups