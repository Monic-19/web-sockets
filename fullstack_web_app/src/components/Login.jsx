import React from 'react'

const Login = () => {
    return (

        <div className='h-[96vh] w-[92vw] lg:h-[92vh] lg:w-[95vw] flex flex-col lg:flex-row bg-[#F6FBFC] rounded-lg shadow-2xl'>

            <div className='w-[100%] h-[50%] lg:w-[40%] lg:h-[100%] flex  items-center justify-center'>

                <div className="cursor-pointer rounded-lg bg-center bg-cover  h-[35vh] w-[35vh] lg:h-[50vh] lg:w-[50vh] bg-no-repeat bg-[url('/assets/logo.jpeg')]"></div>

            </div>

            <div className='w-[90%] h-[50%] lg:w-[60%] m-5 lg:m-[2%] lg:h-[94%] flex items-center justify-center flex-col gap-8 rounded-3xl'>
                <h2 className='text-3xl'>Login to your Account</h2>
                <input
                    className="border-7 border-solid border-black outline-0 p-8 shadow-xl lg:p-4 w-[80%]  lg:w-[50%] h-[7%] text-md lg:text-lg"
                    type="text"
                    placeholder="Enter Username"
                />
                <input
                    className="border-none outline-0 p-8 lg:p-4 w-[80%]  lg:w-[50%]  h-[7%]  text-md lg:text-lg shadow-xl"
                    type="password"
                    placeholder="Enter Password"
                />
                <button className="bg-[#60C4E2] hover:bg-[#A9DCF2] text-white font-bold py-2 px-8 border border-[#A9DCF2] rounded" >Login</button>

            </div>
        </div>

    )
}

export default Login