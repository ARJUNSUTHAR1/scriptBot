import React from "react";
import OAuth from './OAuth.jsx'

const LoginForm = () => {

  return (
    <>
  <div className="absolute top-0 left-0 -z-10 h-[100vh] w-full bg-gradient-to-br from-[#e0c3fc] via-[#f5e1ff] to-[#8ec5fc]">
    <div className="absolute inset-0 mix-blend-multiply blur-lg opacity-50">
      <div className="absolute inset-0 bg-gradient-to-tl from-[#f3e8ff] via-transparent to-[#d1c4e9] opacity-40"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#c5cae9] via-transparent to-[#e0f7fa] opacity-30"></div>
    </div>

    <div
      className="w-full min-h-screen flex justify-center items-center"
      style={{ backdropFilter: "blur(15px)", fontFamily: "Inter" }}
    >
      <div className="border-2 border-black rounded-xl w-full max-w-xl mx-4 p-6 h-[25rem] shadow-lg">
        <div className="flex flex-col items-center my-4">
          <img src="/Vector.png" alt="lync" className="w-10 h-10" />
          <h2 className="font-bold text-4xl mt-2">LYNC</h2>
        </div>
        <form onSubmit={() => {}}>
          <div className="flex flex-col items-start px-4">
            <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight mt-3">
              Welcome Back
            </h3>
            <p className="text-md lg:text-lg text-gray-500 tracking-tight mt-1">
              Kindly Login to get access to the content of this website
            </p>
            <OAuth/>
          </div>
        </form>
      </div>
    </div>
  </div>
    </>
  );
};

export default LoginForm;
