import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

import { googleLogout } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

import {
  userQuery,
  userCreatedPinsQuery,
  userSavedPinsQuery,
} from "../utils/data";

import { client } from "../client";
import MansoryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
//import { fetchUser } from "../utils/fetchUser";

const activeButtonStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none";
const nonActiveButtonStyles =
  "bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none";

const UserProfile = () => {
  const [user, setUser] = useState("");
  const [pins, setPins] = useState("");
  const [text, setText] = useState("Created");
  const [activeButton, setActiveButton] = useState("created");

  const navigate = useNavigate();
  const { userId } = useParams();

  const User =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  const logout = () => {
    localStorage.clear();
    googleLogout();
    navigate("/login");
  };

  if (!user) {
    return <Spinner message="Loading user profile..." />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src="https://source.unsplash.com/1600x900/?nature,photography,technology"
              alt="bannerpicture"
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
            />
            <img
              src={user.image}
              alt="userpicture"
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 z-1 right-0 p-2">
              {userId === User.jti && (
                <GoogleOAuthProvider
                  clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                >
                  <button
                    type="button"
                    onClick={logout}
                    className="bg-white p-2 rounded-full cursor-pointer"
                  >
                    <AiOutlineLogout color="red" fontSize={25} />
                  </button>
                </GoogleOAuthProvider>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveButton("created");
              }}
              className={`${
                activeButton === "created"
                  ? activeButtonStyles
                  : nonActiveButtonStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveButton("saved");
              }}
              className={`${
                activeButton === "saved"
                  ? activeButtonStyles
                  : nonActiveButtonStyles
              }`}
            >
              Saved
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2">
              <MansoryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
              No Pins Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
