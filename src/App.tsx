import React from "react";
import AppRoutes from "./routes";
import "bootstrap/dist/css/bootstrap.css";
import { ControlContextProvider } from "./controlProvider";
const App = () => {
  return (
    <div className="App">
      <ControlContextProvider>
        <AppRoutes />
      </ControlContextProvider>
    </div>
  );
};

export default App;
