import React from 'react';
import { Toaster } from 'react-hot-toast';

const CustomToaster = () => {
    return (
        <Toaster
            position="top-right"
            reverseOrder={false}
            gutter={8}
            toastOptions={{
                // Define default options
                className: '',
                duration: 5000,
                style: {
                    background: '#002455',
                    color: '#fff',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                },
                success: {
                    iconTheme: {
                        primary: '#FF3838',
                        secondary: '#fff',
                    },
                },
            }}
        />
    );
};

export default CustomToaster;
