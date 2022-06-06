import React from "react";
import { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiCloseFillCirlse } from "react-icons/ai";
import { Route, Routes, Link } from "react-router-dom";

import { Sidebar, UserProfile } from "../components";
import Pins from "./Pins";

import { client } from "../client";
import logo from "../assets/logo.png";

import { userQuery } from "../utils/data";

const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);

  //Pull user from local storage
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  //pull user from sanity client
  useEffect(() => {
    const query = userQuery(userInfo?.jti);

    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

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
        <Link to="/">
          <img src={logo} alt="logo" className="w-28" />
        </Link>
        <Link to={`user-profile/${user?._id}`}>
          <img src={user?.image} alt="logged-In-user-dp" className="w-28" />
        </Link>
      </div>
    </div>
  );
};

export default Home;
