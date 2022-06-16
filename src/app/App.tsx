import "antd/dist/antd.css";
import "./App.css";
import Router from "../routes/routes";
import AppLayout from "../components/layout/Layout";
import { useState } from "react";

const App = () => {
  const [tagIndex, setTagIndex] = useState("");
  return (
    <AppLayout tagIndex={tagIndex} setTagIndex={setTagIndex}>
      <Router setTagIndex={setTagIndex} />
    </AppLayout>
  );
};

export default App;
