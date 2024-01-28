import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { useAuth } from '../stroe/auth'

const UserProfile = () => {

  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const [profileData, setProfileData] = useState(null);
  const token = localStorage.getItem("token");

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/user/profile', {
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
        // console.log("User data : ", data)
        setProfileData(data);

      } catch (error) {
        console.error('Error fetching profile data:', error.message);
      }
    };

    fetchData();
  }, []);


  function bye() {
    logoutUser();
    navigate('/')
  }


  return (

    <motion.div
      initial="initial"
      animate="animate"
      variants={animationVariants}
      transition={{ ease: "anticipate", duration: "0.3" }}
      className='h-full w-[70%] bg-[#F3F3F4] flex justify-center items-center'>

{
  profileData ? (
    <div className="max-w-md mx-auto bg-gray-800 shadow-lg rounded-lg overflow-hidden h-[40vh] w-[60vw] lg:w-[30vw] flex flex-col justify-center gap-5 items-center">

      <div className="px-6 py-4">
        <div className="font-bold text-3xl text-green-500 mb-5">
          {`Hi, ${profileData.msg.name}!`}
        </div>
        <p className="text-gray-400 text-base">You are signed with <span className='text-white'>{profileData.msg.email}</span>.</p>
      </div>

      <div className="px-6 py-4 flex justify-center items-center flex-col gap-5">
        <button
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full"
          type="button"
          onClick={bye}
        >
          Logout
        </button>
        <p className="text-white text-base">Please get back early :)</p>
      </div>
    </div>
  ) : (
    <p>Loading profile data...</p>
  )
}
    </motion.div>
  )
}

export default UserProfile