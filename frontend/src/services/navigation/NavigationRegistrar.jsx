import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// This is a common pattern to allow navigation from outside of components (e.g., Axios interceptors)
let navigationRef = null;

export const navigate = (path) => {
    if (navigationRef) {
        navigationRef(path);
    }
};

const NavigationRegistrar = () => {
    const navigateFn = useNavigate();

    useEffect(() => {
        navigationRef = navigateFn;
    }, [navigateFn]);

    return null;
};

export default NavigationRegistrar;
