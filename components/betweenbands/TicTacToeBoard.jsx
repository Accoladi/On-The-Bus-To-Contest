import React, { useState, useEffect } from 'react'
import Tile from './Tile';

const SingleUserIcon = () => (
    <svg className="ttt-icon-small" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
);

const TwoUsersIcon = () => (
    <svg className="ttt-icon-small" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="11" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);

function TicTacToeBoard({ mode, setSingleGameMode, setTwoPlayerGameMode }) {
    const [player, setPlayer] = useState('Trombone');
    const initialBoardState = Array(9).fill(null);
    const [board, setBoard] = useState(initialBoardState);
    const [win, setWin] = useState(null)
    const [winStreak, setWinStreak] = useState(null);
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [2, 4, 6],
        [0, 4, 8]
    ];

    const playButtonSound = () => {
      const audio = new Audio('/sounds/button-sound.mp3');
      audio.volume = 0.2;
      audio.play();
    }

    const isDisabled = mode === 1 && player === 'Drummer';


    useEffect(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'game_start',
            game_id: 'tic_tap_tone',
            game_title: 'Tic Tap Tone',
            game_detail: mode === 1 ? 'single_player' : 'two_player'
        });
    }, [mode]);

    useEffect(() => {
        if (win) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'game_complete',
                game_id: 'tic_tap_tone',
                game_title: 'Tic Tap Tone',
                game_detail: mode === 1 ? 'single_player' : 'two_player',
                winner: win,
                success: true
            });
        }
    }, [win, mode]);

    useEffect(() => {
        if (mode === 1 && player === 'Drummer') {
            const emptySquares = board.reduce((acc, val, index) => {
                if (val === null) {
                    acc.push(index);
                }
                return acc;
            }, []);

            if (emptySquares.length > 0 && !win) {
                let delay;
                const delayedMove = () => {
                    makeSmartComputerMove(board);
                };

                delay = setTimeout(delayedMove, 1000);

                return () => clearTimeout(delay);
            }
        }
    }, [player, board, win]);


    const playerMove = (index) => {
        if (win || board[index] !== null) {
            return;
        }
        const newBoard = [...board];
        newBoard[index] = player;
        setBoard(newBoard);
        const winner = checkWin(newBoard, player);
        if (winner) {
            setWin(winner);
            return;
        }

        setPlayer(player === 'Trombone' ? 'Drummer' : 'Trombone');

    };


    const checkWin = (currentBoard, currentPlayer) => {
        let isBoardFull = true;
        for (let i = 0; i < winConditions.length; i++) {
            const [a, b, c] = winConditions[i];
            if (
                currentBoard[a] === currentPlayer &&
                currentBoard[b] === currentPlayer &&
                currentBoard[c] === currentPlayer
            ) {

                setWinStreak(winConditions[i]);
                return currentPlayer;

            }

            if (currentBoard[a] === null || currentBoard[b] === null || currentBoard[c] === null) {
                isBoardFull = false;
            }
        }

        if (isBoardFull) {
            return "Tie";
        }
        setWinStreak(null);
        return null;

    };

    const makeSmartComputerMove = (currentBoard) => {
        const emptySquares = currentBoard.reduce((acc, val, index) => {
            if (val === null) {
                acc.push(index);
            }
            return acc;
        }, []);
        for (let i = 0; i < emptySquares.length; i++) {
            const testBoard = [...currentBoard];
            testBoard[emptySquares[i]] = 'Drummer';
            if (checkWin(testBoard, 'Drummer')) {
                playerMove(emptySquares[i]);
                return;
            }
        }
        for (let i = 0; i < emptySquares.length; i++) {
            const testBoard = [...currentBoard];
            testBoard[emptySquares[i]] = 'Trombone';
            if (checkWin(testBoard, 'Trombone')) {
                playerMove(emptySquares[i]);
                return;
            }
        }
        const randomIndex = Math.floor(Math.random() * emptySquares.length);
        playerMove(emptySquares[randomIndex]);
    };



    const reset = () => {
      playButtonSound();  
      setBoard(initialBoardState);
      setPlayer('Trombone');
      setWin(null);
      setWinStreak(null);
    };


    const switchToSingle = () => {
        if (mode === 2) {
            reset()
            setSingleGameMode()
        }
    }

    const switchToDouble = () => {
        if (mode === 1) {
            reset()
            setTwoPlayerGameMode()
        }
    }

    return (
        <div className='container'>
            <div className='game-layout'>
                <div className='modes-side-panel'>
                    <button className={`mode-btn-side ttt-premium-btn ${mode === 1 ? 'active-mode-btn' : ''}`} onClick={switchToSingle}>
                        <SingleUserIcon />
                        <span>Single Player</span>
                    </button>
                    <button className={`mode-btn-side ttt-premium-btn ${mode === 2 ? 'active-mode-btn' : ''}`} onClick={switchToDouble}>
                        <TwoUsersIcon />
                        <span>Two Player</span>
                    </button>

                    <div className='ttt-controls-wrapper' style={{ marginTop: '0.5rem', width: '100%' }}>
                        <button onClick={reset} className='reset-button ttt-premium-btn mode-btn-side'>{win ? 'Play Again' : 'Reset'}</button>
                    </div>
                </div>

                <div className='game-center-panel'>
                    <div className='windisplay'>
                        {win ? (
                            win === "Tie" ? (
                                <h3 className='animate__animated animate__fadeIn'>It's a Tie!</h3>
                            ) : (
                                <h3 className='animate__animated animate__fadeIn'>{win} wins</h3>
                            )
                        ) : (
                            <h3 className='animate__animated animate__fadeIn'>
                                {mode === 1 && player === 'Drummer' ? 'Waiting for computer...' : `${player}'s Turn`}
                            </h3>
                        )}
                    </div>

                    <div id='board-outer'>
                        {win ? (
                            <div></div>
                        ) : (
                            <> </>
                        )}
                        <div id='board-body'>
                            {board.map((value, index) => {
                                let isWinningSquare = false;
                                if (winStreak && winStreak.includes(index)) {
                                    isWinningSquare = true;
                                }
                                return <Tile key={index} value={value} player={player} onClick={() => playerMove(index)} isWinningSquare={isWinningSquare}
                                    disabled={isDisabled}
                                />
                            })}

                            <div className={`animate__animated animate__fadeIn ${JSON.stringify(winStreak) === JSON.stringify(winConditions[0]) ? 'win-streak-1' : JSON.stringify(winStreak) === JSON.stringify(winConditions[1]) ? 'win-streak-2' : JSON.stringify(winStreak) === JSON.stringify(winConditions[2]) ? 'win-streak-3' : JSON.stringify(winStreak) === JSON.stringify(winConditions[3]) ? 'win-streak-4' : JSON.stringify(winStreak) === JSON.stringify(winConditions[4]) ? 'win-streak-5' : JSON.stringify(winStreak) === JSON.stringify(winConditions[5]) ? 'win-streak-6' : JSON.stringify(winStreak) === JSON.stringify(winConditions[6]) ? 'win-streak-7' : JSON.stringify(winStreak) === JSON.stringify(winConditions[7]) ? 'win-streak-8' : ''}`}>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TicTacToeBoard













    
   
  
   
  
   
  
   
  
 

 
  
   
   
  
  
   
 

  
   
    
 
   
   
  
  
   
    
  
   
    
