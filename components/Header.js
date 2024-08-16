import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <nav>
        <Link to="/Home">Home</Link>
        <Link to="/Survey">Survey</Link>
      </nav>
    </header>
  );
};

export default Header;
