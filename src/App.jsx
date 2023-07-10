import { Link, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeMenu from "./components/HomeMenu";
import Survey from "./components/SurveyForm";

function App() {
  return (
    <div className="App border w-screen h-screen flex justify-center items-center shadow-lg w-3/4 m-auto">
      <Routes>
        <Route path="/" element={<HomeMenu />} />
        <Route path="/survey" element={<Survey />} />
      </Routes>
    </div>
  );
}

export default App;
