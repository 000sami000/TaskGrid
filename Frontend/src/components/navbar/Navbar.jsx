import React from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { signOut_ } from "../../api";
import toast, { Toaster } from "react-hot-toast";
function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const handleLogout = async () => {
    try {
      await signOut_(); // Make a POST request to clear the cookie
      localStorage.setItem("currentUser", null);
      navigate("/auth");
      window.location.reload();
    } catch (error) {
      console.error("Error logging out", error);
    }
  };
  return (
    <div className=" absolute z-10 w-full bg-[#7676f7] px-2 py-3 ">
      <div className="flex justify-between items-center">
        <span
          className=" text-[25px] cursor-pointer text-[white]"
          onClick={() => {
            if (currentUser) {
              navigate("/");
            } else {
              toast("Login to Continue");
            }
          }}
        >
          TaskGrid
        </span>
        {location.pathname !== "/auth" && !currentUser && (
          <span>
            <button
              className="px-2 py-1 bg-[#eea827] rounded-md"
              onClick={() => {
                navigate("/auth");
                window.location.reload();
              }}
            >
              Sign In
            </button>
          </span>
        )}

        {currentUser && (
          <div className="flex gap-3">
            <span className="text-[20px] text-[white]">{currentUser.name}</span>
            <span>
              <button
                className="px-2 py-1 bg-[#eea827] rounded-md text-[white]"
                onClick={handleLogout}
              >
                Sign out
              </button>
            </span>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default Navbar;
