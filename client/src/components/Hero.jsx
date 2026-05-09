import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="min-h-[80vh] flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-6xl font-bold max-w-4xl leading-tight  bg-gradient-to-r from-green-100 to-green-400 bg-clip-text text-transparent">
        Stop Overpaying For AI Tools
      </h1>

      <p className="mt-6 text-slate-400 text-xl max-w-2xl">
        Analyze your AI stack, detect overspending, and discover savings
        opportunities instantly.
      </p>

      <Link
        to="/audit"
        className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl text-lg font-semibold"
      >
        Get Free Audit
      </Link>
    </section>
  );
};

export default Hero;
