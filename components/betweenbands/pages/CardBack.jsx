import React from 'react';

const CardBack = ({ options, handleAnswer }) => {
    return (
        <div className="card back">
            <h2>Options</h2>
            <ul>
                {options.map((option, index) => (
                    <li key={index} onClick={() => handleAnswer(option)}>{option}</li>
                ))}
            </ul>
        </div>
    );
};

export default CardBack;
