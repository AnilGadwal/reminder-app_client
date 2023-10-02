import React from "react";
import "./App.css";
import "./cssReset.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/login/index.js";
import Registration from "./Components/resgistration";
import Dashboard from "./Components/dashboard/index.js";
import ProtectedRoute from "./Components/ProtectedRoute.js";
import PageNotFound from "./Components/pageNotFound";
import Homepage from "./Components/homepage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/dashboard" element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
