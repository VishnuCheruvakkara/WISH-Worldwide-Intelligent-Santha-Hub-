import React from 'react';

const DateFormatter = ({ dateString, className = "" }) => {
    if (!dateString) return null;

    const formattedDate = new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <span className={className}>
            {formattedDate}
        </span>
    );
};

export default DateFormatter;
