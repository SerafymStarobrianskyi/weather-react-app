import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Settings from "./pages/Settings";
import WeatherPage from "./pages/WeatherPage";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/weather/:city" element={<WeatherPage />} />
      </Routes>
    </>
  );
}

export default App;
