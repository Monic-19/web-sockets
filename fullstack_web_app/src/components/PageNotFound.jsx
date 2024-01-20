import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion"


const PageNotFound = () => {
    const navigate = useNavigate(); 
    const ani = {
        initial:{y:"-50%"},
        animate:{y:0,},
        transistion : {duration : 0.3, ease : "easeInOut"}
    };
    const ani2 = {
        initial:{y:"50%"},
        animate:{y:0,},
        transistion : {duration : 0.3, ease : "easeInOut"}
    };
    const ani3 = {
        initial:{scale:1.7},
        animate:{scale : 0.7},
        transition:{ ease: "linear", duration: 2, delay : 0.4 ,  repeat: Infinity }
    };



    return (
        <div className=' cursor-not-allowed overflow-hidden h-[96vh] w-[92vw] lg:h-[92vh] lg:w-[95vw] flex flex-col lg:flex-row bg-[#F6FBFC] rounded-lg shadow-2xl'>
            <div className="flex items-center justify-center h-full w-full bg-[#F3F3F4] rounded-md">

                <div  className="px-4 lg:py-12">
                    <div className="lg:gap-4 lg:flex">
                        <motion.div {...ani}
                            className="flex flex-col items-center justify-center md:py-24 lg:py-32"
                        >
                            <h1 className="font-bold text-gray-900 text-9xl">404</h1>
                            <p
                                className="mb-2 text-2xl font-bold text-center text-gray-800 md:text-3xl"
                            >
                                <span className="text-red-500">Oops!</span> Page not found
                            </p>
                            <p className="mb-8 text-center text-gray-500 md:text-lg">
                                The page you’re looking for doesn’t exist.
                            </p>
                            <motion.div {...ani3}
                                onClick={ () => {navigate('/')}}
                                className="px-6 py-2 text-sm font-semibold text-white bg-gray-900"
                            >Go home</motion.div>
                        </motion.div>
                        <motion.div {...ani2} className="mt-4">
                            <img
                                src="/assets/logo.jpeg"
                                alt="img"
                                className="object-cover w-full h-full"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound