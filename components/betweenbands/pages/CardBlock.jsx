import React from 'react';

const CardFront = ({ question }) => {
    return (
        <div className="card front">
            <h2>Question</h2>
            <p>{question}</p>
        </div>
    );
};

export default CardFront;
