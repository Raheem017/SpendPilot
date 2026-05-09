import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-slate-700">
      <Link to="/" className="text-2xl font-bold">
        SpendPilot🍃
      </Link>

      <Link
        to="/audit"
        className=" bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-lg  font-semibold mr-10"
      >
        Start Audit
      </Link>
    </nav>
  );
};

export default Navbar;
