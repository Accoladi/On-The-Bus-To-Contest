import React, { useState, useEffect, useRef } from 'react'
import "./../styles/crossword.css";
import { Link } from 'react-router-dom'


export default function CrossWord() {

    const [activeQuestion, setActiveQuestion] = useState(1);
    const [activeStreak, setActiveStreak] = useState([]);
    const [inputValues, setInputValues] = useState([]);
    const [checkAnswersClicked, setCheckAnswersClicked] = useState(false);
    const rows = 25;
    const cols = 14;
    const initialPuzzleState = Array.from({ length: rows }, () => Array.from({ length: cols }, () => null));
    const [puzzle, setPuzzle] = useState(initialPuzzleState);
    const [win, setWin] = useState(false);

    const correctAnswers = [
        'M', 'A', 'R', 'K', 'T', 'I', 'M', 'E', 'P', 'I', 'P', 'O', 'D', 'I', 'U', 'N', 'T', 'E', 'R', 'V', 'A', 'L', 'G', 'E', 'M', 'X', 'E', 'C', 'U', 'T', 'I', 'O', 'N', 'L', 'P', 'H', 'O', 'N', 'E', 'T', 'U', 'A', 'S', 'D', 'R', 'I', 'L', 'L', 'N', 'T', 'R', 'E', 'D', 'A', 'M', 'E', 'C', 'A', 'D', 'E', 'N', 'C', 'R', 'N', 'K', 'T', 'E', 'P', 'O', 'B', 'O', 'E', 'L', 'O', 'H', 'S', 'A', 'K', 'O',
    ]




    const resetGame = () => {
        setActiveQuestion(1);
        setPuzzle(initialPuzzleState);
        setInputValues([]);
        setEnteredValues(Array(filledCells.length).fill(null)); // Reset enteredValues
        setCheckAnswersClicked(false);
        setWin(false);  // Reset win state
    };

    const filledCells = [
        [5, 0],
        [5, 1],
        [5, 2],
        [5, 3],
        [5, 4],
        [5, 5],
        [5, 6],
        [5, 7],
        [3, 4],
        [4, 4],
        [0, 6],
        [1, 6],
        [2, 6],
        [3, 6],
        [4, 6],
        [6, 5],
        [7, 5],
        [8, 5],
        [9, 5],
        [10, 5],
        [11, 5],
        [12, 5],
        [8, 4],
        [12, 4],
        [12, 3],
        [6, 7],
        [7, 7],
        [8, 7],
        [9, 7],
        [10, 7],
        [11, 7],
        [12, 7],
        [13, 7],
        [12, 6],
        [12, 8],
        [12, 9],
        [12, 10],
        [12, 11],
        [12, 12],
        [11, 12],
        [10, 12],
        [8, 12],
        [7, 12],
        [9, 9],
        [9, 10],
        [9, 11],
        [9, 12],
        [9, 13],
        [11, 10],
        [13, 10],
        [14, 10],
        [15, 10],
        [16, 10],
        [17, 10],
        [18, 10],
        [19, 10],
        [15, 4],
        [15, 5],
        [15, 6],
        [15, 7],
        [15, 8],
        [15, 9],
        [14, 5],
        [16, 5],
        [17, 5],
        [18, 8],
        [18, 9],
        [18, 11],
        [18, 12],
        [19, 12],
        [20, 12],
        [21, 12],
        [21, 11],
        [21, 10],
        [21, 9],
        [20, 9],
        [22, 9],
        [23, 9],
        [24, 9],
    ];


    const [enteredValues, setEnteredValues] = useState(Array(filledCells.length).fill(null));

    useEffect(() => {
        if (activeQuestion === 1) {
            setActiveStreak([
                [0, 6],
                [1, 6],
                [2, 6],
                [3, 6],
                [4, 6],
                [5, 6],
            ]);

            setInputValues([
                [''],
                [''],
                [''],
                [''],
                [''],
                ['']
            ])
        } else if (activeQuestion === 2) {
            setActiveStreak([
                [3, 4],
                [4, 4],
                [5, 4],
            ]);

            setInputValues([
                [''],
                [''],
                [''],
            ])

        } else if (activeQuestion === 3) {
            setActiveStreak([
                [5, 0],
                [5, 1],
                [5, 2],
                [5, 3],
                [5, 4],
                [5, 5],
                [5, 6],
                [5, 7],
            ]);

            setInputValues([
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                ['']
            ])
        } else if (activeQuestion === 4) {
            setActiveStreak([
                [5, 5],
                [6, 5],
                [7, 5],
                [8, 5],
                [9, 5],
                [10, 5],
                [11, 5],
                [12, 5],
            ])

            setInputValues([
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                ['']
            ])

        } else if (activeQuestion === 5) {
            setActiveStreak([
                [5, 7],
                [6, 7],
                [7, 7],
                [8, 7],
                [9, 7],
                [10, 7],
                [11, 7],
                [12, 7],
                [13, 7],

            ])

            setInputValues([
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                ['']
            ])
        } else if (activeQuestion === 6) {
            setActiveStreak([
                [7, 12],
                [8, 12],
                [9, 12],
                [10, 12],
                [11, 12],
                [12, 12],
            ])

            setInputValues([
                [''],
                [''],
                [''],
                [''],
                [''],
                ['']

            ])
        } else if (activeQuestion === 7) {
            setActiveStreak([
                [8, 4],
                [8, 5],
            ])

            setInputValues([
                [''],
                ['']

            ])
        } else if (activeQuestion === 8) {
            setActiveStreak([
                [9, 9],
                [9, 10],
                [9, 11],
                [9, 12],
                [9, 13],
            ])

            setInputValues([
                [''],
                [''],
                [''],
                [''],
                ['']
            ])
        } else if (activeQuestion === 9) {
            setActiveStreak([
                [11, 10],
                [12, 10],
                [13, 10],
                [14, 10],
                [15, 10],
                [16, 10],
                [17, 10],
                [18, 10],
                [19, 10],

            ])

            setInputValues([
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                ['']
            ])
        } else if (activeQuestion === 10) {
            setActiveStreak([
                [12, 3],
                [12, 4],
                [12, 5],
                [12, 6],
                [12, 7],
                [12, 8],
                [12, 9],
                [12, 10],
                [12, 11],
                [12, 12],

            ])

            setInputValues([
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                ['']
            ])
        } else if (activeQuestion === 11) {
            setActiveStreak([
                [14, 5],
                [15, 5],
                [16, 5],
                [17, 5],
            ])

            setInputValues([
                [''],
                [''],
                [''],
                ['']
            ])
        } else if (activeQuestion === 12) {
            setActiveStreak([
                [15, 4],
                [15, 5],
                [15, 6],
                [15, 7],
                [15, 8],
                [15, 9],
                [15, 10],
            ])

            setInputValues([
                [''],
                [''],
                [''],
                [''],
                [''],
                [''],
                ['']

            ])
        } else if (activeQuestion === 13) {
            setActiveStreak([
                [18, 8],
                [18, 9],
                [18, 10],
                [18, 11],
                [18, 12],

            ])

            setInputValues([
                [''],
                [''],
                [''],
                [''],
                [''],
            ])
        } else if (activeQuestion === 14) {
            setActiveStreak([
                [18, 12],
                [19, 12],
                [20, 12],
                [21, 12],
            ])
            setInputValues([
                [''],
                [''],
                [''],
                [''],
            ])
        } else if (activeQuestion === 15) {
            setActiveStreak([
                [20, 9],
                [21, 9],
                [22, 9],
                [23, 9],
                [24, 9],
            ])

            setInputValues([
                [''],
                [''],
                [''],
                [''],
                [''],
            ])
        } else {
            setActiveStreak([
                [21, 9],
                [21, 10],
                [21, 11],
                [21, 12],

            ])

            setInputValues([
                [''],
                [''],
                [''],
                [''],
            ])
        }


    }, [activeQuestion]);

    const totalQuestions = 16;

    const handleChange = (index, e) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = e.target.value.toUpperCase();
        setInputValues(newInputValues);
    };


    const handleKeyDown = (index, e) => {
        if (/^[a-zA-Z]$/.test(e.key)) {
            e.preventDefault();
            const newInputValues = [...inputValues];
            newInputValues[index] = e.key.toUpperCase();
            setInputValues(newInputValues);

            if (index < activeStreak.length - 1) {
                const nextIndex = index + 1;
                document.getElementById(`input-${nextIndex}`).focus();
            }
        } else if (e.key === 'Backspace') {
            e.preventDefault();
            const currentInput = inputValues[index];

            if (currentInput === '') {
                if (index > 0) {
                    const prevIndex = index - 1;
                    document.getElementById(`input-${prevIndex}`).focus();
                }
            } else {
                const newInputValues = [...inputValues];
                newInputValues[index] = '';
                setInputValues(newInputValues);
            }
        }
    };

    const resetInputValues = () => {
        setInputValues(Array(activeStreak.length).fill(''));
    };


    // const checkCompletion = () => {
    //     const isPuzzleComplete = enteredValues.every(value => value !== null);
    //     if (isPuzzleComplete) {
    //         console.log('Puzzle is complete!');
    //         filledCells.forEach(([row, col], index) => {
    //             console.log(`Value at (${row}, ${col}): ${enteredValues[index]}`);
    //         });
    //     }
    // };
    const answerSubmit = () => {
        if (inputValues.every(value => typeof value === 'string' && value.trim() !== '' && value !== null)) {
            const newEnteredValues = [...enteredValues];
            const newPuzzle = puzzle.map(row => [...row]);
            activeStreak.forEach(([row, col], index) => {
                const cellIndex = filledCells.findIndex(([r, c]) => r === row && c === col);
                if (cellIndex !== -1) {
                    newEnteredValues[cellIndex] = inputValues[index];
                    newPuzzle[row] = [...newPuzzle[row]];
                    newPuzzle[row][col] = inputValues[index];
                }
            });
            setEnteredValues(newEnteredValues);
            setPuzzle(newPuzzle);
            nextQuestion();
        } else {
            alert('Please fill in the entire answer before submitting');
        }
    };



    const checkAnswers = (e) => {
        e.preventDefault();
        const isCorrect = enteredValues.every((value, index) => value.toUpperCase() === correctAnswers[index]);
        setCheckAnswersClicked(true);
        if (isCorrect) {
            setWin(true);
        }
    };




    const nextQuestion = () => {
        const newQuestion = (activeQuestion % totalQuestions) + 1;
        setActiveQuestion(newQuestion);
        resetInputValues();
    };

    const prevQuestion = () => {
        const newQuestion = (activeQuestion - 2 + totalQuestions) % totalQuestions + 1;
        setActiveQuestion(newQuestion);
    };



    const grid = Array.from({ length: rows }, () => Array.from({ length: cols }).fill(0));

    filledCells.forEach(([row, col]) => {
        if (row < rows && col < cols) {
            grid[row][col] = 1;
        }
    });



    const gridItems = [];

    const clues = [
        { number: 1, start: [0, 6] },
        { number: 2, start: [3, 4] },
        { number: 3, start: [5, 0] },
        { number: 4, start: [5, 5] },
        { number: 5, start: [5, 7] },
        { number: 6, start: [7, 12] },
        { number: 7, start: [8, 4] },
        { number: 8, start: [9, 9] },
        { number: 9, start: [11, 10] },
        { number: 10, start: [12, 3] },
        { number: 11, start: [14, 5] },
        { number: 12, start: [15, 4] },
        { number: 13, start: [18, 8] },
        { number: 14, start: [18, 12] },
        { number: 15, start: [20, 9] },
        { number: 16, start: [21, 9] },
    ];


    const streakClick = (row, col) => {
        const activeQuestionIndex = clues.findIndex(clue => clue.start[0] === row && clue.start[1] === col);


        if (activeQuestionIndex !== -1) {
            const questionStreakNumber = clues[activeQuestionIndex].number;
            setActiveQuestion(questionStreakNumber);
        }

    }




    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // const [row, col] = filledCells[index];
            const isFilled = grid[row] && grid[row][col] === 1;

            const isStartOfClue = clues && activeStreak && clues.some(
                (clue) => clue && clue.start && Array.isArray(clue.start) && clue.start[0] === row && clue.start[1] === col
            );

            const cellStyle = {
                outline: isFilled ? '1px solid #000' : 'none',
                backgroundColor: isFilled ? '#fff' : 'transparent',
                boxSizing: 'border-box',
                position: 'relative'

            };

            const cellContent = (
                <div

                >
                    <span

                        className={`entered-letter ${checkAnswersClicked &&
                            enteredValues.find(
                                (value, index) =>
                                    filledCells[index][0] === row && filledCells[index][1] === col
                            ) === correctAnswers[
                            filledCells.findIndex(
                                (cell) => cell[0] === row && cell[1] === col
                            )
                            ]
                            ? 'correct'
                            : checkAnswersClicked &&
                                enteredValues.find(
                                    (value, index) =>
                                        filledCells[index][0] === row && filledCells[index][1] === col
                                ) !== correctAnswers[
                                filledCells.findIndex(
                                    (cell) => cell[0] === row && cell[1] === col
                                )
                                ]
                                ? 'incorrect'
                                : 'mid-game-letter'

                            }`}
                    >
                        {enteredValues.find((value, index) => filledCells[index][0] === row && filledCells[index][1] === col) || ''}
                    </span>
                    {isStartOfClue && (
                        <div className='clue'>
                            {clues.find(clue => clue && clue.start && clue.start[0] === row && clue.start[1] === col)?.number}
                        </div>
                    )}
                </div>
            );
            // win !== true &&
            gridItems.push(
                <div className={`cell ${activeStreak.length > 0 && activeStreak.some(([r, c]) => r === row && c === col) ? 'active-streak-cell' : ''}`} key={`${row}-${col}`} style={cellStyle}
                    onClick={() => streakClick(row, col)}
                >
                    {cellContent}
                </div>
            );
        }
    }


    return (
        <div id='crossword-main'>
            <div id='crossword-container'>
                <div id='crossword-bg'>
                    <div id='crossword-grid'>
                        {gridItems}
                    </div>

                </div>
                <img id='crossword-img-1' className='crossword-img' src={'/images/crossword-1.png'}></img>
                <img id='crossword-img-2' className='crossword-img' src={'/images/crossword-2.png'}></img>
                <img id='crossword-img-3' className='crossword-img' src={'/images/crossword-3.png'}></img>
                <img id='crossword-img-4' className='crossword-img' src={'/images/crossword-4.png'}></img>
                <img id='crossword-img-5' className='crossword-img' src={'/images/crossword-5.png'}></img>
            </div>


            <div id='crossword-control-main' style={{ position: 'relative' }}>
                {win ? (
                    <div id='win-indicator'>
                        <p>You Win</p>
                        <button onClick={resetGame}>Play Again</button>

                        <button className='animate__animated animate__bounce crossword-home-btn'>
                            <Link style={{ textDecoration: 'none', color: 'white' }} to='/'>
                                Home
                            </Link>

                        </button>
                    </div>
                ) : (
                    <></>
                )}
                <div className={`${win ? 'win-blur' : ''}`}>
                    <div id='crossword-control'>

                        <div onClick={prevQuestion} className=' prev-btn questions-btn btn-background-circle-q'>
                            <svg className='arrow-prev-q arrow-q' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114.53 162.9">
                                <path
                                    className='prev svg-btn-q'
                                    d="M217.4,165.87a7.76,7.76,0,0,0,0,12.12l52,41.61,38.68,30.94a12.87,12.87,0,0,0,20.91-10h0a12.88,12.88,0,0,0-4.83-10.05L310.62,219.6,251,171.93l59.6-47.65,13.57-10.85A12.89,12.89,0,0,0,329,103.38h0a12.87,12.87,0,0,0-20.91-10l-38.68,31Z"
                                    transform="translate(-214.49 -90.49)"
                                />
                            </svg>
                        </div>
                        <div className={`question ${activeQuestion === 1 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 1</h4>
                                <img src={'/images/down-icon.png'} height='28px'></img>
                            </div>

                            <p>Raised Platform Where the Drum Major Stands?</p>
                        </div>
                        <div className={`question ${activeQuestion === 2 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 2</h4>
                                <img src={'/images/down-icon.png'} height='28px'></img>
                            </div>
                            <p>Percussion Players Who Do Not March?</p>
                        </div>
                        <div className={`question ${activeQuestion === 3 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 3</h4>
                                <img src={'/images/across-icon.png'} width='30px'></img>
                            </div>
                            <p>Term For Marching in Place?</p>
                        </div>
                        <div className={`question ${activeQuestion === 4 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 4</h4>
                                <img src={'/images/down-icon.png'} height='28px'></img>
                            </div>
                            <p>Distance of Two Band Members Standing Side By Side?</p>
                        </div>
                        <div className={`question ${activeQuestion === 5 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 5</h4>
                                <img src={'/images/down-icon.png'} height='28px'></img>
                            </div>
                            <p>How Precisely Something is Done?</p>
                        </div>
                        <div className={`question ${activeQuestion === 6 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 6</h4>
                                <img src={'/images/down-icon.png'} height='28px'></img>
                            </div>
                            <p>The Drum Major Starts the Show with a ______?</p>
                        </div>
                        <div className={`question ${activeQuestion === 7 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 7</h4>
                                <img src={'/images/across-icon.png'} width='30px'></img>
                            </div>
                            <p>Slang Term For General Effect?</p>
                        </div>
                        <div className={`question ${activeQuestion === 8 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 8</h4>
                                <img src={'/images/across-icon.png'} width='30px'></img>
                            </div>
                            <p>The Choreography of the Marching Show?</p>
                        </div>
                        <div className={`question ${activeQuestion === 9 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 9</h4>
                                <img src={'/images/down-icon.png'} height='28px'></img>
                            </div>
                            <p>What was the First College Marching Band in America?</p>
                        </div>
                        <div className={`question ${activeQuestion === 10 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 10</h4>
                                <img src={'/images/across-icon.png'} width='30px'></img>
                            </div>
                            <p>Marching French Horn?</p>
                        </div>
                        <div className={`question ${activeQuestion === 11 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 11</h4>
                                <img src={'/images/down-icon.png'} height='28px'></img>
                            </div>
                            <p>Two or More People Standing Side by Side?</p>
                        </div>
                        <div className={`question ${activeQuestion === 12 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 12</h4>
                                <img src={'/images/across-icon.png'} width='30px'></img>
                            </div>
                            <p>What the Drumlins Play Between Songs in a Parade?</p>
                        </div>
                        <div className={`question ${activeQuestion === 13 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 13</h4>
                                <img src={'/images/across-icon.png'} width='30px'></img>
                            </div>
                            <p>Speed of the Music?</p>
                        </div>
                        <div className={`question ${activeQuestion === 14 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 14</h4>
                                <img src={'/images/down-icon.png'} height='28px'></img>
                            </div>
                            <p>Woodwind Instrument not in a Marching Band?</p>
                        </div>
                        <div className={`question ${activeQuestion === 15 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 15</h4>
                                <img src={'/images/down-icon.png'} height='28px'></img>
                            </div>
                            <p>Military style band hat with plume?</p>
                        </div>
                        <div className={`question ${activeQuestion === 16 ? 'active-question' : ''}`}>
                            <div className='question-labl'>
                                <h4>Question 16</h4>
                                <img src={'/images/across-icon.png'} width='30px'></img>
                            </div>
                            <p>Absence of band members creates a ______?</p>
                        </div>
                        <div onClick={nextQuestion} className=' next-btn questions-btn btn-background-circle-q'>
                            <svg className='arrow-next-q arrow-q' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 114.53 162.9">
                                <path
                                    className='next svg-btn-q'
                                    d="M326.1,165.87a7.75,7.75,0,0,1,0,12.12l-52,41.61-38.69,30.94a12.86,12.86,0,0,1-20.9-10h0a12.88,12.88,0,0,1,4.83-10.05l13.57-10.85,59.6-47.67-59.6-47.65-13.57-10.85a12.89,12.89,0,0,1-4.83-10.05h0a12.86,12.86,0,0,1,20.9-10l38.69,31Z"
                                    transform="translate(-214.49 -90.49)"
                                />
                            </svg>
                        </div>
                    </div>
                    <form className='question-input'>
                        <div className='input-cells'>
                            {activeStreak.map((cell, index) => (
                                <input
                                    key={index}
                                    id={`input-${index}`}
                                    className='question-input-cell'
                                    value={inputValues[index]}
                                    onChange={(e) => handleChange(index, e)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}

                                    maxLength={1}
                                />
                            ))}
                        </div>


                        <div className='input-btns'>
                            {inputValues.every(value => typeof value === 'string' && value.trim() !== '' && value !== null) ? (
                                <div className='submit-btn' onClick={answerSubmit}>
                                    Submit
                                </div>
                            ) : (
                                <div className='submit-btn-disabled' onClick={answerSubmit}>
                                    Submit
                                </div>
                            )}



                            <div>
                                {enteredValues.every(value => value !== null || '') ? (
                                    <button className='check-btn' onClick={checkAnswers}>Check</button>
                                ) : (
                                    <button type="button" className='disabled-check-btn'>Check</button>
                                )
                                }

                            </div>
                        </div>
                    </form>


                </div>

            </div>


        </div>
    )
}


