import "./App.css";
import React from "react";
import Homepage from "./componets/Homepage";
import { Routes, Route } from "react-router-dom";
import Connect from "./componets/Connect";
import Error from "./componets/Error";
import AdminPage from "./componets/AdminPage";
import Passwordpage from "./componets/Passwordpage";

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="connect" element={<Connect />} />
      <Route path="admin" element={<Passwordpage />} />
    </Routes>
  );
}

export default App;
