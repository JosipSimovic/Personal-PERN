import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navigation from "./shared/components/Navigation/Navigation";
import "./App.css";
import "./style-constants.css";
import TopBar from "./shared/components/Navigation/TopBar";
import Naslovna from "./naslovna/Naslovna";
import Profil from "./profil/Profil";

function App() {
  let routes = (
    <Routes>
      <Route
        path="/"
        element={<Naslovna />}
      />
      <Route path="/profil" element={<Profil />} />
    </Routes>
  );

  return (
    <Router>
      <TopBar />
      <Navigation />
      <main className="main">{routes}</main>
    </Router>
  );
}

export default App;
