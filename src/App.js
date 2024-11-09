import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Stoore from "./Components/Stoore";
import Explore from "./Components/Explore";
import Save from './Components/Save';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Stoore />} />
        <Route path="/Explore" element={<Explore />} />
        <Route path="/save" element={<Save />} />
      </Routes>
    </Router>
  );
}
