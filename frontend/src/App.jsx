import { Link, Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import HomeMenu from "./components/HomeMenu";
import Survey from "./components/SurveyForm";
import Success from "./components/Success";

function App() {
  return (
    <div className="App  border w-screen h-screen flex justify-center items-center shadow-lg w-3/4 m-auto">
      <Routes>
        <Route path="/" element={<HomeMenu />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
