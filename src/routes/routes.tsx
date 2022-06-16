import React from "react";
import { Route, Routes } from "react-router-dom";
import Check from "../components/page/check/check";
import Setting from "../components/page/setting";
import Home from "../components/home";
import Ticket from "../components/page/ticket/ticket";

interface Props {
  setTagIndex: React.Dispatch<React.SetStateAction<string>>;
}

const index = ({ setTagIndex }: Props) => {
  return (
    <Routes>
      <Route path="/" element={<Home setTagIndex={setTagIndex} />} />
      <Route path="/ticket" element={<Ticket setTagIndex={setTagIndex} />} />
      <Route path="/check" element={<Check setTagIndex={setTagIndex} />} />
      <Route path="/setting" element={<Setting setTagIndex={setTagIndex} />} />
    </Routes>
  );
};

export default index;
