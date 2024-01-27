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
        console.log("User data : ", data)
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
      className='h-full w-[70%] bg-[#F3F3F4]'>


      <div>
        <button onClick={bye}>Logout</button>
      </div>

      {profileData ? (
        <div>
          <p>Name: {profileData.msg.name}</p>
          <p>Email: {profileData.msg.email}</p>
        </div>
      ) : (
        <p>Loading profile data...</p>
      )}


    </motion.div>
  )
}

export default UserProfile