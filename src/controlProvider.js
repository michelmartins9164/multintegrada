import { createContext } from "react";
import { useState } from "react";

export const ControlContext = createContext();

export function ControlContextProvider({ children }) {
    const [status, setStatus] = useState("Não atendido");
    const [sintomas, setSintomas] = useState([
        {
            tosse: "",
            respirar: "",
            olfato: "",
            coriza: "",
            nariz: "",
            sintomas: "",
        },
    ]);
    return (
        <ControlContext.Provider value={{ sintomas, setSintomas, status, setStatus }}>
            {children}
        </ ControlContext.Provider>
    )
}