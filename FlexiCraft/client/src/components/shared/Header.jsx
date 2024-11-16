import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Search, BellIcon, MessageCircle } from "lucide-react";
import dp from "../../assets/dp.png";
import { UserContext } from "../UserContext";
import { useEffect } from "react";

export default function Header() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profilePic,setProfilePic] = useState(null)
  const { logout } = useAuth0();

  useEffect(() => {
    if (user){
      setProfilePic(`http://localhost:5000/uploads/${user.profilePic}`);
    }
  }, [user])
  

  const handleItemClick = (path) => {
    navigate(path);
    setIsOpen(false);
  };
  

  const [openPopover, setOpenPopover] = useState(null);

  const togglePopover = (popoverName) => {
    setOpenPopover(openPopover === popoverName ? null : popoverName);
  };
  //[1180px]
  return (
    <div className="fixed bg-white h-16 px-4 flex items-center border-b border-gray-200 justify-between  w-screen">
      <div className="flex flex-row bg-neutral-200 w-[300px] rounded-full ml-[190px]">
        <Search className=" size-8 text-gray-400 mt-1 px-2" />
        <input
          type="text"
          placeholder="Search..."
          className="text-sm focus:outline-none active:outline-none bg-neutral-200 w-100 h-10 pr-4 text-neutral-900"
        />
      </div>

      <div className="flex items-center gap-2 mr-2">
        {/* Messages Popover */}
        <div className="relative">
          <button
            onClick={() => togglePopover("messages")}
            className={`group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100 ${
              openPopover === "messages" ? "bg-gray-100" : ""
            }`}
          >
            <MessageCircle fontSize={24} />
          </button>
          {openPopover === "messages" && (
            <div className="absolute right-0 z-10 mt-2.5 transform w-80">
              <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                <strong className="text-gray-700 font-medium">Messages</strong>
                <div className="mt-2 py-1 text-sm text-neutral-900">
                  This is the messages panel.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => togglePopover("notifications")}
            className={`group inline-flex items-center rounded-sm p-1.5 text-gray-700 hover:text-opacity-100 focus:outline-none active:bg-gray-100 ${
              openPopover === "notifications" ? "bg-gray-100" : ""
            }`}
          >
            <BellIcon fontSize={24} />
          </button>
          {openPopover === "notifications" && (
            <div className="absolute right-0 z-10 mt-2.5 transform w-80">
              <div className="bg-white rounded-sm shadow-md ring-1 ring-black ring-opacity-5 px-2 py-2.5">
                <strong className="text-gray-700 font-medium">
                  Notifications
                </strong>
                <div className="mt-2 py-1 text-sm text-neutral-900">
                  This is the notifications panel.
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative inline-block text-left">
          <button className="inline-flex justify-center rounded-full border border-gray-300 shadow-sm mt-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none">
            
            <img
              src={profilePic}// Use profilePicUrl if it exists, otherwise use dp
              className="size-10 rounded-full"
              alt="Profile"
            />
          </button>

          {isOpen && (
            <div className="origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md bg-white ring-1 ring-black ring-opacity-5">
              <div
                onClick={() => handleItemClick("/profile")}
                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-sm"
              >
                Your Profile
              </div>
              <div
                onClick={() => handleItemClick("/settings")}
                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-sm"
              >
                Settings
              </div>
              <div
                onClick={() => logout({ returnTo: window.location.origin })}
                className="px-4 py-2 text-gray-700 cursor-pointer hover:bg-gray-100 active:bg-gray-200 rounded-sm"
              >
                Sign out
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
