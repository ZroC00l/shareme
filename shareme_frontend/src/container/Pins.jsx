import React from "react";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Navbar, CreatePin, Search, Feed, PinDetail } from "../components";

const Pins = () => {
  /*This state is placed in Pins and not Search component, because it will be shared 
  across mutiple components used by Pins component*/
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="px-2 md:px-5">
      <div className="bg-gray-50">
        <Navbar searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default Pins;
