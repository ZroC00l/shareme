import React from "react";
import { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiCloseFillCirlse } from "react-icons/ai";
import { Route, Routes, Link } from "react-router-dom";

import { Sidebar, UserProfile } from "../components";
import Pins from "./Pins";

import { client } from "../client";
import logo from "../assets/logo.png";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState();

  return (
    <div className="flex bg-gray-50 md:flex-row flex-col h-screen transition-height duration-75 ease-out ">
      <div className="hidden md:flex h-screen flex-initial ">
        <Sidebar />
      </div>
      <div className="flex md:hidden flex-row ">
        <HiMenu
          fontSize={40}
          className="cursor-pointer"
          onClick={() => setToggleSidebar(false)}
        />
      </div>
    </div>
  );
};

export default Home;
