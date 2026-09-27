import React, { useState, useEffect } from 'react';
import '.././styles/trivia.css';

<body style={{ backgroundColor: '#eaac8b' }}></body>
const questions = [
    {
        question: "  Which university marching band has the largest bass drum?",
        options: ["University of Texas", "Temple University", "Purdue University",
            "University of Missouri,"],
        answer: "University of Texas"
    },
    {
        question: "In the Broadway Music “The Music Man” the Band Director Harold Hill had how many trombones leading his parade band?",
        options: ["42", "110", "76", "86"],
        answer: "76"
    },
    {
        question: "The metronome marking for a military march is most often . . . ?",
        options: ["184",
            "120",
            "136",
            "66"],
        answer: "120"
    },
    {
        question: "What is another term used for marching band judges?",
        options: ["Adjudicator",
            "Scorer",
            "Music Umpire",
            "General Effect Tracker"],

        answer: "Adjudicator"
    },
    {
        question: "What university had the first marching band show at a football game halftime?",
        options: ["Harvard University",
            "University of Illinois",
            "Rutgers University",
            "University of Alabama"],
        answer: "University of Illinois"
    },
    {
        question: "Which of the sections do not march?",
        options: ["Drum Line",
            "The Pit",
            "Sousaphones",
            "Baritone Saxophones"
        ],
        answer: "The Pit"
    },
    {
        question: "What high school band marches the most members?",
        options: ["Pulaski High School, Pulaski, Wisconsin",
            "Arcadia High School, Arcadia, California",
            "Allen High School, Allen, Texas",
            "Timber Creek High School, Orlando, Florida"
        ],
        answer: "Allen High School, Allen, Texas"
    },
    {
        question: "Who created the sousaphone for marching band?",
        options: ["J.W. Pepper",
            "John Philip Sousa",
            "Tuba Players in the 1891 US Marine Corps Band",
            "H.N. White"],
        answer: "J.W. Pepper"
    },
    {
        question: " How long is a high school marching band competition show?",
        options: ["7 to 9 minutes",
            "19 to 21 minutes",
            "4 to 6 minutes",
            "15 to 17 minutes"
        ],
        answer: "7 to 9 minute"
    },
    {
        question: "Each competitive marching band will be judged on G.E.: What is G.E.?",
        options: ["Greatest Enthusiasm",
            "Generated Energy",
            "Greatest Effort",
            "General Effect"
        ],
        answer: "Greatest Effort"
    },
    {
        question: "What is the purpose of a “drum major” in a marching band?",
        options: ["To play the largest drum",
            "To conduct the band",
            "To perform a solo dance routine",
            "To lead the colorguard",

        ],
        answer: "To conduct the band"
    },
    {
        question: "Which musical instrument sets and maintains the tempo of the marching band?",
        options: ["Trumpet",
            "Clarinet",
            "Trombone",
            "Snare Drum"],
        answer: "Snare Drum"
    },
];

const GameOverScreen = ({ score }) => {
    return (
        <div className="GameOverScreen">
            <h2>Game Over</h2>
            <p>Your final score is {score}</p>
        </div>
    );
};

const TriviaGame = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    const handleAnswer = (selectedOption) => {
        if (selectedOption === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setGameOver(true);
        }
    };

    useEffect(() => {
        if (gameOver) {
            // Set a timeout to exit the page after 30 seconds
            const timeoutId = setTimeout(() => {
                window.location.reload(); // Reload the page after 30 seconds
            }, 30000);

            return () => {
                clearTimeout(timeoutId); // Clear the timeout if the component unmounts
            };
        }
    }, [gameOver]);

    return (
        <div className="TriviaGame" style={{ backgroundColor: ' #355070' }}
        
        >
            <h1>Trivia Game</h1>
            {gameOver ? (
                <GameOverScreen score={score} />
            ) : (
                <div>
                    <p className="Question">Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}</p>
                    <ul className="AnswerOption">
                        {questions[currentQuestionIndex].options.map((option, index) => (
                            <li key={index} onClick={() => handleAnswer(option)}>{option}</li>
                        ))}
                    </ul>
                </div>
            )}
            <p style={{ padding: '60px' }}>Score: {score}</p>
        </div>
    );
};


export default TriviaGame;
