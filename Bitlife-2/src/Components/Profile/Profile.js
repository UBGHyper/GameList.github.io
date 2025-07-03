import React, { useState, useCallback } from "react";
import { faker   } from '@faker-js/faker';
import { createAvatar } from '@dicebear/core';
import { micah } from '@dicebear/collection';

export const ProfileContext = React.createContext(null);

const generateProfile = () => {
    const sex = faker.person.sexType();
    const firstName = faker.person.firstName(sex);
    const lastName = faker.person.lastName();
    const email = faker.internet.email({ firstName, lastName });
    const musicGenre = faker.music.genre();
    const moneyBalance = 0;
    const country = faker.location.country();
    const assets = [
        {
            invest: 0,
            fn: undefined,
            id: new Date().getTime(),
        },

    ]
    const job = {
        jobTitle: "Unemployed",
        salary: 0
    }
    const propAvatar = {
        seed: firstName + lastName,
        radius: 50
    };
    const age = 0;
    const timeLine = [
        {
            age: 0,
            event: ["Born",],
            id: new Date().getTime()
        },
    ];

    return {
        email,
        firstName,
        lastName,
        sex,
        musicGenre,
        propAvatar,
        moneyBalance,
        timeLine,
        age,
        job,
        country,
        assets
    };
}

const generateAvatar = (propsAvatar) => {
    const avatar = createAvatar(micah, {
        ...propsAvatar
    });
    return avatar.toDataUriSync();
}

export const ProfileProvider = ({ children }) => {
    const initialProfile = generateProfile();
    const initialAvatar = generateAvatar(initialProfile.propAvatar);

    const [profile, setProfile] = useState({
        ...initialProfile,
        avatarString: initialAvatar
    });

    const changeProfile = useCallback(() => {
        const newProfile = generateProfile();
        const newAvatar = generateAvatar(newProfile.propAvatar);
        setProfile({
            ...newProfile,
            avatarString: newAvatar
        });
    }, []);

    const addProps = useCallback((props) => {
        setProfile((prevProfile) => {
            const newProps = {
                ...prevProfile.propAvatar,
                ...props
            };
            const newAvatar = generateAvatar(newProps);
            return {
                ...prevProfile,
                avatarString: newAvatar,
                propAvatar: newProps
            };
        });
    }, []);

    const addEvents = (texte) => {
        setProfile(prev => {
            const newTimeLine = [...prev.timeLine];
            const lastEvent = { ...newTimeLine[newTimeLine.length - 1] };
            lastEvent.event = [...lastEvent.event, texte];
            newTimeLine[newTimeLine.length - 1] = lastEvent;
            return {
                ...prev,
                timeLine: newTimeLine
            };
        });
    };


    const contextValue = {
        profile,
        changeProfile,
        addProps,
        setProfile,
        addEvents
    };

    return (
        <ProfileContext.Provider value={contextValue}>
            {children}
        </ProfileContext.Provider>
    );
}
