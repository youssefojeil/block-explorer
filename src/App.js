import { Alchemy, Network, Utils } from "alchemy-sdk";
import { useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import "./App.css";
import HomePage from "./Pages/HomePage";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

function App() {
  return (
    <BrowserRouter>
      {/* set up routes */}
      <Routes>
        <Route path="/" element={<HomePage alchemy={alchemy} />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
