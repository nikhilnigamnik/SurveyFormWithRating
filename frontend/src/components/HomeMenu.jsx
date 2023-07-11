import React from "react";
import { Link } from "react-router-dom";

const HomeMenu = () => {
  return (
    <div className="bdr py-20 px-4 bg-white">
      <h1 className="font-bold text-5xl">Customer Survey</h1>
      <p className="mt-4">
        We want to hear from you! Help us enhance your experience by sharing
        your thoughts and suggestions through this survey.
      </p>

      <div className="mt-4">
        <Link to={"/survey"}>
          <button className="bg-mainclr shadow text-white px-4 py-1 rounded-md">
            Start
          </button>
        </Link>
      </div>
    </div>
  );
};

export default HomeMenu;
