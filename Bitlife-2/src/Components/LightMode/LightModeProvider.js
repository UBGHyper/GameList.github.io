import React, { useState } from "react";

export const LightModeContext = React.createContext();


export const LightModeProvider = ({ children }) => {
    const [lightMode, setLightMode] = useState(false);

    return (
        <LightModeContext.Provider value={{ lightMode, setLightMode }}>
            {children}
        </LightModeContext.Provider>
    );
}