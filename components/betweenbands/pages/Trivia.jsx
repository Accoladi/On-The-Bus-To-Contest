import React, { useState, useEffect } from 'react';

const questions = [
    {
        question: "Which university marching band has the largest bass drum?",
        options: ["University of Texas", "Temple University", "Purdue University", "University of Missouri"],
        answer: "University of Texas"
    },
    {
        question: "In the Broadway Music “The Music Man” the Band Director Harold Hill had how many trombones leading his parade band?",
        options: ["42", "110", "76", "86"],
        answer: "76"
    },
    {
        question: "The metronome marking for a military march is most often . . . ?",
        options: ["184", "120", "136", "66"],
        answer: "120"
    },
    {
        question: "What is another term used for marching band judges?",
        options: ["Adjudicator", "Scorer", "Music Umpire", "General Effect Tracker"],
        answer: "Adjudicator"
    },
    {
        question: "What university had the first marching band show at a football game halftime?",
        options: ["Harvard University", "University of Illinois", "Rutgers University", "University of Alabama"],
        answer: "University of Illinois"
    },
    {
        question: "Which of the sections do not march?",
        options: ["Drum Line", "The Pit", "Sousaphones", "Baritone Saxophones"],
        answer: "The Pit"
    },
    {
        question: "How long is a high school marching band competition show?",
        options: ["7 to 9 minutes", "19 to 21 minutes", "4 to 6 minutes", "15 to 17 minutes"],
        answer: "7 to 9 minutes"
    },
    {
        question: "Each competitive marching band will be judged on G.E.: What is G.E.?",
        options: ["Greatest Enthusiasm", "Generated Energy", "Greatest Effort", "General Effect"],
        answer: "General Effect"
    },
    {
        question: "What is the purpose of a “drum major” in a marching band?",
        options: ["To play the largest drum", "To conduct the band", "To perform a solo dance routine", "To lead the colorguard"],
        answer: "To conduct the band"
    },
    {
        question: "Which musical instrument sets and maintains the tempo of the marching band?",
        options: ["Trumpet", "Clarinet", "Trombone", "Snare Drum"],
        answer: "Snare Drum"
    },
];

const GameOverScreen = ({ score, totalQuestions, level, goToLevel2 }) => {
    const percentage = (score / totalQuestions) * 100;

    return (
        <div className="GameOverScreen">
            <h2>Game Over</h2>
            <p>Your final score is {score}</p>
            <p>Percentage: {percentage}%</p>
            {level === 1 && percentage > 90 && (
                <button onClick={goToLevel2}>Go to Level 2</button>
            )}
        </div>
    );
};

const TriviaGame = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [answered, setAnswered] = useState(false);

    const [points, setPoints] = useState(0);
    const [elapsedTime, setElapsedTime] = useState(0);

    const totalQuestions = questions.length;

    useEffect(() => {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            event: 'game_start',
            game_id: 'trivia',
            game_title: 'Marching Band Trivia'
        });
    }, []);

    useEffect(() => {
        if (gameOver) {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: 'game_complete',
                game_id: 'trivia',
                game_title: 'Marching Band Trivia',
                score: score,
                points: points,
                total_questions: totalQuestions,
                success: true
            });
        }
    }, [gameOver, score, points, totalQuestions]);

    useEffect(() => {
        let timer;
        if (!answered && !gameOver) {
            timer = setInterval(() => {
                setElapsedTime((prev) => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [answered, gameOver]);

    const playSound = () => {
        const audio = new Audio('/sounds/trivia-select.mp3');
        audio.play();
    }

    const handleAnswer = (selectedOption) => {
        if (answered) return;
        playSound();

        if (selectedOption === questions[currentQuestionIndex].answer) {
            setScore(score + 1);

            let pts = 0;
            if (elapsedTime < 3) pts = 50;
            else if (elapsedTime < 5) pts = 30;
            else if (elapsedTime < 10) pts = 20;
            else if (elapsedTime < 20) pts = 10;
            else if (elapsedTime < 30) pts = 5;
            else pts = 1;

            setPoints(points + pts);
        }

        setSelectedOption(selectedOption);
        setAnswered(true);

        if (currentQuestionIndex < questions.length - 1) {
            setTimeout(() => {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
                setAnswered(false);
                setElapsedTime(0);
            }, 1500);
        } else {
            setTimeout(() => {
                setGameOver(true);
            }, 1500);
        }
    };

    useEffect(() => {
        if (gameOver) {
            const timeoutId = setTimeout(() => {
                window.location.reload();
            }, 30000);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [gameOver]);

    return (
        <div
            id='trivia-outer'
            style={{
                width: '100%',
                backgroundImage: score === 10 ? 'url(/images/triv-win-img.jpg)' : 'url(/entertainment/games/marching-band-trivia.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >

            {score === 10 ? (
                <div className='perfect-win-title'>
                    <h1 style={{ fontSize: '40px' }}>10/10 Perfect Score!</h1>
                </div>
            ) : (
                <></>
            )

            }

            <div
                className={`TriviaGame ${score === 10 ? 'triv-perfect-score' : ''}`}

            >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 20px', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    <span style={{ color: '#FFD700' }}>⏱ {elapsedTime}s</span>
                    <span style={{ color: '#fff' }}>Points: {points}</span>
                </div>
                <h1>Trivia Game</h1>
                {gameOver ? (
                    <GameOverScreen score={score} totalQuestions={totalQuestions} />
                ) : (
                    <div>
                        <p className="Question">Question {currentQuestionIndex + 1}: {questions[currentQuestionIndex].question}</p>
                        <div className="AnswerOptions">
                            {questions[currentQuestionIndex].options.map((option, index) => (
                                <div
                                    key={index}
                                    className="AnswerOptionBox"
                                    onClick={() => handleAnswer(option)}
                                    style={{ backgroundColor: selectedOption === option && option !== questions[currentQuestionIndex].answer ? 'red' : 'transparent' }}
                                >
                                    <p style={{ color: selectedOption === option && option !== questions[currentQuestionIndex].answer ? 'black' : 'white' }}>
                                        {option}
                                    </p>
                                </div>
                            ))}
                        </div>
                        {answered && (
                            <div className="CorrectAnswerBox" style={{ backgroundColor: 'green', color: 'white', padding: '10px', marginTop: '10px' }}>
                                Correct Answer: {questions[currentQuestionIndex].answer}
                            </div>
                        )}
                    </div>
                )}
                <p style={{ marginTop: '30px', fontSize: '1.25rem', fontWeight: 'bold', color: '#FFD700' }}>Score: {score} / 10 &nbsp;|&nbsp; Points: {points}</p>
            </div>
        </div>
    );
};

export default TriviaGame;


