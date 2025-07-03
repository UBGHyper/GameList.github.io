import React, { useContext } from 'react'
import "./GameComponents.css"
import { LightModeContext } from '../LightMode/LightModeProvider';
import { ProfileProvider } from '../Profile/Profile';
import { Header } from './Header/Header';
import { Body } from './Body/Body';
import { Footer } from './Footer/Footer';
import { Route, Routes } from 'react-router-dom';
import { WorkComponents } from '../WorkComponents/WorkComponents';
import { BankComponents } from '../BankComponents/BankComponents';

export const GameComponents = () => {
    const { lightMode } = useContext(LightModeContext);

    const lightModeClass = {
        backgroundColor: lightMode ? "white" : "#5E9FF2",
        color: lightMode ? "black" : "white",
        borderColor: lightMode ? "black" : "#435C84",
    };
    return (
        <div className='GameContainer' style={lightModeClass}>
            <ProfileProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<><Body /><Footer /></>} />
                    <Route path="/work" element={<WorkComponents />} />
                    <Route path="/bank" element={<BankComponents />} />
                </Routes>
            </ProfileProvider>
        </div>
    )
}
