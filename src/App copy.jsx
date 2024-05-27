
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { About, Contact, Home, Services } from "./components/pages/postAuth/client";
import { Events } from "./components/pages/postAuth/client/Events";

import LoginPage from "./components/pages/preAuth/LoginPage";
import Dashboard from "./components/pages/postAuth/admin/Dashboard";
import Sidebar from "./components/pages/postAuth/admin/Sidebar";
import React from "react";

function App() {
  return (
    <div className="App">
         <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      <Routes>
        {/* Pre-authorization routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/sidebar" element={<Sidebar />} />
 
        {/* Post-authorization routes */}

        {/* Admin */}
        <Route path="/admin" element={<><Dashboard /></>} />

        {/* Client */}
        <Route path="/home" element={<><Navbar /><Home /><Footer /></>} />
        <Route path="/about" element={<><Navbar /><About /><Footer /></>} />
        <Route path="/services" element={<><Navbar /><Services /><Footer /></>} />
        <Route path="/contact" element={<><Navbar /><Contact /><Footer /></>} />
        <Route path="/events" element={<><Navbar /><Events /><Footer /></>} />
        
      </Routes>
    </div>
  );
}

export default App;