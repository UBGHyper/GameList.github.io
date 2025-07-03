import React, { useContext } from 'react'
import { ProfileContext } from '../../Profile/Profile';
import { LightModeContext } from '../../LightMode/LightModeProvider';
import "./Header.css"

export const Header = () => {
    const p = React.useContext(ProfileContext);
    const {lightMode} = React.useContext(LightModeContext);
    const lightModeClass = {
        backgroundColor: lightMode ? "white" : "#030F26",
        color: lightMode ? "black" : "white",
        borderColor : lightMode ? "black" : "#435C84",
    };
    return (
        <div className='HeaderContainer'  >
            <div className='HeaderProfileInfo' style={lightModeClass} >
                <img src={p.profile.avatarString} alt="avatar" />
                <div className='HeaderProfileInfoName'>
                    <p>{`${p.profile.firstName} ${p.profile.lastName}`}</p>
                    <span>{p.profile.country}</span>
                    <span>{p.profile.job.jobTitle}</span>
                </div>
                <div className='MoneyContainer'>
                    <p>{p.profile.moneyBalance + " $"}</p>
                    <span>Moiney Balance</span>
                </div>
            </div>
        </div>
    )
}
