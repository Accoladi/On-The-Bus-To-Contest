'use client';
import React, { useState, useEffect } from 'react';
import '../styles/trivia.css';
import TriviaGame from './Trivia';


const TRiviaHome = () => {
    return (
        <div className='trivia-main'>
            <TriviaGame />
        </div>
    )
};
export default TRiviaHome;
