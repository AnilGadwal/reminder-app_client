import React from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <div>
        <span className="logo">FhyniX</span>
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/registration")}>Register</button>
      </div>
    </div>
  );
};

export default Homepage;
