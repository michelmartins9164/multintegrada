import { BrowserRouter, Route, Routes } from "react-router-dom";
import Atendimento from "./components/pages/atendimento";
import Home from "./components/pages/home";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/atendimento/:id" element={<Atendimento />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
