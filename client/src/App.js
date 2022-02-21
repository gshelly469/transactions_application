import React from "react";
import './App.css';
import Topbar from "./components/Topbar/Topbar";
import Dash from "./components/Dashboard/Dashboard";
import Upload from "./components/UploadTrans/UploadTrans"
import Admin from "./components/admin/admin"
import Transactions from "./components/Transactions/Transactions"
import Login from "./components/Login/Login";

import {Link, BrowserRouter as Router, Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Router>
      {/* <Login /> */}
        <Routes>
          <Route exact path ="/Login" element={<Login />} />

          <Route exact path ="/" element={<Dash />} />
          <Route exact path ="/*" element={<Dash />} />
          <Route exact path ="/Admin" element={<Admin />} />
          <Route exact path ="/Transaction" element={<Transactions />} />
          <Route exact path ="/UploadTrans" element={<Upload />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
