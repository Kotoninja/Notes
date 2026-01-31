import React from "react";

export const NotesLabel = ({style}) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 80" width={style.width} height={style.height} style={{ display: style.display,justifyContent : style.justifyContent}}>
            <defs>
                <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#ffffffff" />
                    <stop offset="100%" stopColor="#ffffffff" />
                </linearGradient>
            </defs>
            <rect x="10" y="15" width="50" height="50" rx="5" fill="none" stroke="url(#grad3)" strokeWidth="3" />
            <line x1="20" y1="30" x2="40" y2="30" stroke="#ffffffff" strokeWidth="4" strokeLinecap="round" />
            <line x1="20" y1="40" x2="40" y2="40" stroke="#ffffffff" strokeWidth="4" strokeLinecap="round" />
            <line x1="20" y1="50" x2="30" y2="50" stroke="#ffffffff" strokeWidth="4" strokeLinecap="round" />
            <text x="75" y="52" fontFamily="Arial, sans-serif" fontSize="42" fontWeight="bold" fill="url(#grad3)">Notes</text>
        </svg>
    )
};
