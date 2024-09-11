import React from "react";
import { FiSearch, FiBell } from "react-icons/fi";
import { useRecoilValue } from "recoil";
import { userInfoState } from "../../../store/user/user";

const Topbar = () => {

  const userInfo = useRecoilValue(userInfoState);

  return (
    <div className="flex justify-between">
      <div className="flex items-center justify-start border-2 border-gray-400 w-1/2 px-4 py-3  rounded-full">
        <FiSearch className="mr-2" />
        <input
          type="text"
          placeholder="Search your thing..."
          className="bg-transparent focus:outline-none ml-4"
        />
      </div>
      <div className="flex items-center space-x-16">
        <FiBell size={"1.6rem"} className="text-gray-500" />
        <img
          src="/Vector2.png"
          alt="User Avatar"
          className="w-11 h-11"
        />
        <div className="font-semibold text-[1.3rem] text-gray-700">
          {userInfo?.displayName}
        </div>

        {/* <p>{userInfo?.email}</p> */}
      </div>
    </div>
  );
};

export default Topbar;
