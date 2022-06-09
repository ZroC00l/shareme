import React, { useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";

import { client } from "../client";
import Spinner from "./Spinner";
import { categories } from "../utils/data";

const CreatePin = ({ user }) => {
  // state fields
  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState(false);
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAsset] = useState(null);
  const [wrongImagetype, setWrongImagetype] = useState(false);

  const navigate = useNavigate();

  //My methods
  const uploadImage = (e) => {
    const { type, name } = e.target.files[0];

    if (
      type === "image/png" ||
      type === "image/jpeg" ||
      type === "image/jpg" ||
      type === "image/gif" ||
      type === "image/webp" ||
      type === "image/svg+xml" ||
      type === "image/tiff"
    ) {
      setWrongImagetype(false);
      setLoading(true);

      //if we do have the correct image type then we can upload to our database
      client.assets
        .upload("image", e.target.files[0], {
          contentType: type,
          filename: name,
        })
        .then((document) => {
          setImageAsset(document);
          setLoading(false);
        })
        .catch((error) => {
          console.log("Image upload error", error);
        });
    } else {
      setLoading(false);
      setWrongImagetype(true);
    }
  };

  const handleUpload = () => {
    if (title && about && destination && imageAsset?._id && category) {
      const doc = {
        _type: "pin",
        title,
        about,
        destination,
        image: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: imageAsset._id,
          },
        },
        userId: user._id,
        postedBy: {
          _type: "postedBy",
          _ref: user._id,
        },
        category,
      };
      client.create(doc).then(() => {
        navigate("/");
      });
    } else {
      setFields(true);

      setTimeout(() => {
        setFields(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5 ">
      {fields && (
        <p className="text-red-500 mb-5 text-xl transition-full duration-150 ease-in">
          Please fill in all the fields
        </p>
      )}
      <div className="flex lg:flex-col flex-row justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
        <div className="bg-secondaryColor p-3 flex flex flex-0.7 w-full">
          <div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
            {loading && <Spinner />}
            {wrongImagetype && <p>Wrong image type</p>}
            {!imageAsset ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high quality JPG,SVG,TIFF,PNG,WEBP or GIF less than 20MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              /*(
              /If the imageAsset is already uploaded then do something else
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="user-post"
                  className="h-full w-full"
                />
                <button
                  type="button"
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-lg cursor-pointer outline-none hover:shadow-md transition-all duration-500 "
                >
                  <MdDelete />
                </button>

                <button
                  onClick={handleUpload}
                  type="button"
                  className="absolute bottom-3 left-3 p-3 bg-green-500 p-3 hover:bg-green-700 text-white rounded-full font-bold px-4 py-2"
                >
                  Upload
                </button>
              </div>
            )}*/
              <div className="relative h-full">
                <img
                  src={imageAsset?.url}
                  alt="user-post"
                  className="w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => setImageAsset(null)}
                  className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shadow-md transition-all duration-500 ease-in-out"
                >
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Add a title to your Pin"
            className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2"
          />
          {user && (
            <div className="flex gap-2 mt-2 mb-2 items-center bg-white rounded-lg">
              <img
                src={user.image}
                alt=""
                className=" w-10 h-10 rounded-full"
              />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
