import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { googleLogout } from "@react-oauth/google";

import {
  userQuery,
  userCreatedPinsQuery,
  userSavedPinsQuery,
} from "../utils/data";

import { client } from "../client";
import MansoryLayout from "./MasonryLayout";
import Spinner from "./Spinner";

const activeButtonsStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const nonActiveButtonsStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState("");
  const [createdPins, setCreatedPins] = useState("");
  const [text, setext] = useState();
  const [activeButton, setActiveButton] = useState("created");

  const navigate = useNavigate();
  const { userId } = useParams();

  return <div>UserProfile</div>;
};

export default UserProfile;
