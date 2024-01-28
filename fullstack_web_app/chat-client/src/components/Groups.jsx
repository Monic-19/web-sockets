import { IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { motion, AnimatePresence } from "framer-motion"
import { useNavigate } from 'react-router-dom';

const Groups = () => {

    const [groups, setGroups] = useState([]);
    const token = localStorage.getItem("token");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

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
        const fetchGroups = async () => {
            try {
                const response = await fetch('http://localhost:3000/chat/fetchGroup', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch groups');
                }

                const groupsData = await response.json();
                // console.log(groupsData)
                setGroups(groupsData);

            } catch (error) {
                console.error(error.message);
            }
        };

        fetchGroups();
    }, []);

    // async function startChat(data) {
    //     console.log("adding in group ", data.chatName);
    //     let userId = data._id;
    //     console.log(data)
    //     try {
    //         const response = await fetch('http://localhost:3000/chat/group', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`, 
    //           },
    //           body: JSON.stringify({ userId }),
    //         });

    //         if (!response.ok) {
    //           throw new Error(`Request failed with status ${response.status}`);
    //         }

    //         const result = await response.json();
    //         console.log(result)
    //         // console.log("Chat created with ", data.chatName); 
    //         // navigate(`app/chat/${data._id}&${data.chatName}`)

    //       } catch (error) {
    //         console.error(error.message);
    //       }

    // }


    return (
        <AnimatePresence>
            <motion.div
                variants={animationVariants}
                initial="initial"
                animate="animate"
                transition={{ ease: "anticipate", duration: "0.3" }}
                className='h-full w-[70%] bg-[#F3F3F4]'>
                <div className='mt-[10px] flex m-[6%] bg-white  rounded-md flex-col items-center lg:flex-row  lg:m-[2%] lg:p-3 lg:mt-[12px] shadow-md'>

                    <div className="left m-2 lg:m-0 h-[7vh] w-[7vh] lg:h-[5vh] lg:w-[5vh] bg-cover bg-no-repeat bg-[url('/assets/logo.jpeg')]">
                    </div>

                    <h1 className="right pl-[2%] m-2 lg:m-0 font-bold text-gray-500">
                        All Groups
                    </h1>
                </div>

                <div className='bg-white rounded-md mx-[6%] -mt-[2.3%] flex items-center flex-col p-1 lg:flex-row lg:p-2 lg:-mt-[0.3%] lg:m-[2%] shadow-md'>
                    <IconButton>
                        <SearchIcon ></SearchIcon>
                    </IconButton>
                    <input 
                        className=' outline-0 border-none w-full text-sm p-1 lg:text-lg lg:ml-3 text-center lg:text-left' 
                        type="text" 
                        placeholder='search' 
                        onChange={(e) => setSearch(e.target.value)}/>
                </div>

                <div className=' h-[74vh] lg:h-[70vh] rounded-md mt-[4%] m-[6%] p-3 overflow-y-scroll scroll-smooth lg:mt-[2%] lg:m-[2%] flex flex-col items-center '>

                    {groups.filter((group) => {
                        return search.toLowerCase() == ""
                            ? group : group.chatName.toLowerCase().includes(search)
                    }).
                        map(group => (
                            <div
                                key={group._id}
                                onClick={() => startChat(group)}
                                className='user w-[100%] lg:min-w-[45%] lg:max-w-[60%] h-[5vh] lg:h-[8vh] rounded-full bg-white lg:p-2  flex justify-center lg:justify-normal items-center cursor-pointer shadow-lg mb-[1vh]   hover:scale-105'>

                                <div className='hidden lg:flex h-[50px] w-[50px] bg-[#dadada] rounded-full m-2 items-center justify-center '>
                                    <h1 className='text-2xl '>{group.chatName[0]}</h1>
                                </div>
                                <div className='flex justify-between items-center text-gray-500 gap-6 w-[80%]'>
                                    <h2 className=' font-bold lg:ml-4 text-[1.5vh] lg:text-[2.5vh] '>{group.chatName}</h2>
                                    <h5 className='lg:ml-4 text-[1.25vh] lg:text-[2vh] '>{group.users.length} members</h5>
                                </div>

                            </div>

                        ))}




                </div>
            </motion.div>

        </AnimatePresence>
    )
}

export default Groups