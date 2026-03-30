import { HashRouter, Routes, Route } from "react-router-dom";
import RoomDashboard from "./pages/RoomDashboard";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<RoomDashboard />} />
      </Routes>
    </HashRouter>
  );
}

