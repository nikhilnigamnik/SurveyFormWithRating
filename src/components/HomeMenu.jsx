import React from "react";
import { Link } from "react-router-dom";

const HomeMenu = () => {
  return (
    <div>
      Hilloooo
      <div>
        <Link to={"/survey"}>
          <button>Go For Survey</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeMenu;
