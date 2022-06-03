import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  const responseGoogleSuccess = (response) => {
    //console.log(response.string);
    //console.log("authentication has failed");

    console.log("This is the actual response object");
    console.log(response);

    console.log("This is the encoded Credentials");
    console.log("Encoded JWT ID Token: " + response.credential);
    var decoded = jwt_decode(response.credential);
    console.log("This is the decoded data ");
    console.log(decoded);
    /*Testing output from credentials JWT response
    //console.log(decoded.name + "Deez Nutz");*/

    localStorage.setItem("user", JSON.stringify(decoded));

    const { name, picture } = decoded;

    const doc = {
      _id: process.env.REACT_APP_GOOGLE_API_TOKEN,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  const responseGoogleFailure = () => {
    console.log("authentication has failed");
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>
          <div className="shadow-2xl">
            <GoogleOAuthProvider
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
            >
              <GoogleLogin
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4" />
                    Sign in with Google
                  </button>
                )}
                theme="filled_blue"
                auto_select="false"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFailure}
                cookiePolicy={"single_host_origin"}
              />
            </GoogleOAuthProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
