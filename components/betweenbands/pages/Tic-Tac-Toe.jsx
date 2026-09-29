'use client';
import React, { useState } from 'react'
import TicTacToeBoard from '../TicTacToeBoard';

const SingleUserIcon = () => (
    <svg className="ttt-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const TwoUsersIcon = () => (
    <svg className="ttt-icon" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="11" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

const TicTacToe = () => {
    const [optionsDisplay, toggleOptionsDisplay] = useState(true);

    const hideDisplayOptions = () => {
        toggleOptionsDisplay(false);
    }

    const [mode, gameMode] = useState(null)

    const playButtonSound = () => {
        const audio = new Audio('/sounds/button-sound.mp3');
        audio.volume = 0.2;
        audio.play();
    }

    const setSingleGameMode = () => {
        playButtonSound();
        hideDisplayOptions();
        gameMode(1)
    }

    const setTwoPlayerGameMode = () => {
        playButtonSound()
        hideDisplayOptions();
        gameMode(2)
    }



    return (
        <div id='tic-tac-toe-main' style={{ backgroundImage: `url(/entertainment/games/tip-tap-tone.png)` }} >
            <div className="ttt-glass-overlay">
                {optionsDisplay ? (
                    <div id='modes' className="ttt-glass-card">
                        <h2>Select Game Mode</h2>
                        <div className='mode-section'>
                            <button className='mode-btn ttt-premium-btn' onClick={setSingleGameMode}>
                                <SingleUserIcon />
                                <span>Single Player</span>
                            </button>
                            <button className='mode-btn ttt-premium-btn' onClick={setTwoPlayerGameMode}>
                                <TwoUsersIcon />
                                <span>Two Player</span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <TicTacToeBoard setSingleGameMode={setSingleGameMode} setTwoPlayerGameMode={setTwoPlayerGameMode} mode={mode} />
                )}
            </div>
        </div>
    )

}

export default TicTacToe 
