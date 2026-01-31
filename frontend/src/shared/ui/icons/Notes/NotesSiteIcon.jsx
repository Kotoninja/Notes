import React from "react";

export const NotesSiteIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="80" height="80">
            <defs>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#ffffff" />
                    <stop offset="100%" stop-color="#ffffff" />
                </linearGradient>
            </defs>
            <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="url(#grad3)" stroke-width="2" />
            <line x1="8" y1="8" x2="16" y2="8" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
            <line x1="8" y1="12" x2="16" y2="12" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
            <line x1="8" y1="16" x2="12" y2="16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" />
        </svg>
    );
};
