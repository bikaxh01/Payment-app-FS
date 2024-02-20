import React from "react";
import { useNavigate } from "react-router-dom";
function Landing() {
  const navigate = useNavigate();
  const btnhandler = () => {
    navigate("/signin");
  };
  return (
    <div className="flex justify-center items-center m-72">
      <button
        onClick={btnhandler}
        className=" bg-blue-600 text-white h-14 w-28 rounded-xl hover:bg-blue-500"
      >
        Sign In
      </button>
    </div>
  );
}

export default Landing;
