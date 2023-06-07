import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import { Breadcrumbs } from "@mui/material";
import Navbar from "./components/Navbar";
import WeatherBackground from "./components/WeatherBackground";

const App: React.FC = () => {
  return (
    <div>
      <WeatherBackground />
      <Navbar />
      <Breadcrumbs />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </div>
  );
};

export default App;
