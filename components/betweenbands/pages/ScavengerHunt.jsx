import React, { useState, useEffect } from 'react'

import Link from 'next/link'

const ScavengerHunt = () => {
    const initializeHunt = Array(8).fill(null);
    const [hunt, setHunt] = useState(initializeHunt);
    const [win, setWin] = useState(false);


    const itemClick = (index) => {
        if (win || hunt[index] !== null) {
            return
        }
        const updatedHunt = [...hunt];
        updatedHunt[index] = true;
        setHunt(updatedHunt);

        if (updatedHunt.every((item) => item === true)) {
            setWin(true);
        }
    }

    const calculatePicHeight = () => {
        const windowWidth = window.innerWidth;

        if (windowWidth > 992) {
            return (windowWidth * 0.8) * 0.5625;
        } else if (windowWidth <= 992 && windowWidth > 768) {
            return windowWidth * 0.5625;
        } else if (windowWidth <= 768 && windowWidth > 450) {
            return 1000 * 0.5625;
        } else {
            return 800 * 0.5625;
        }
    };

    const [winWidth, trackWinWidth] = useState(0);

    const [picHeight, setPicHeight] = useState(450);


    const resetGame = () => {
        setWin(false);
        setHunt(initializeHunt);
    }



    useEffect(() => {
        trackWinWidth(window.innerWidth);
        setPicHeight(calculatePicHeight());
        const handleResize = () => {
            setPicHeight(calculatePicHeight());
        };

        const setWindowWidth = () => {
            // Update winWidth with the current window.innerWidth
            trackWinWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('windowWidth', setWindowWidth);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('windowWidth', setWindowWidth);
        };
    }, []);


    const foundItemsCount = hunt.filter((item) => item === true).length;

    // <div className={`${win ? 'image-blur' : ''}`}>
    return (
        <div className='scavenger-main'>

            {!win ? (
                <></>
            ) : (
                <div id='winning-screen'>
                    <h3 id='win-greeting' className='animate__animated animate__bounce'>Nice Work! You Found them All</h3>
                    <button id='reset-hunt' className='animate__animated animate__slideInRight' onClick={resetGame}>Play Again</button>
                    <button className='animate__animated animate__bounce after-game-home-btn'>
                        <Link style={{ textDecoration: 'none', color: 'white' }} href='/'>
                            Home
                        </Link>

                    </button>
                </div>
            )}


            {winWidth <= 776 ? (
                <div className='animate__animated animate__bounce' id='scroll-anim'>
                    <img src={'images/arrow-left.png'} height='20px'></img>
                    <p>Scroll</p>
                    <img src={'images/arrow-right.png'} height='20px'></img>
                </div>
            ) : (
                <div>
                </div>
            )

            }



            <div style={{ marginBottom: 5 }} id='items-lbl'>
                <p>Scavenger Hunt: Find All of the items</p>
            </div>
            <div id='scav-hunt-container' >
                <div style={{ backgroundImage: `url(/images/scavenger.png)`, height: picHeight }} id='image-outer'>

                    <div
                        onClick={() => itemClick(0)}
                        className={`item ${hunt[0] !== null ? 'found' : ''}`}
                        id='item-1'
                    >

                    </div>
                    <div
                        onClick={() => itemClick(1)}
                        className={`item ${hunt[1] !== null ? 'found' : ''}`}
                        id='item-2'
                    >

                    </div>
                    <div
                        onClick={() => itemClick(2)}
                        className={`item ${hunt[2] !== null ? 'found' : ''}`}
                        id='item-3'
                    >

                    </div>
                    <div
                        onClick={() => itemClick(3)}
                        className={`item ${hunt[3] !== null ? 'found' : ''}`}
                        id='item-4'
                    >

                    </div>
                    <div
                        onClick={() => itemClick(4)}
                        className={`item ${hunt[4] !== null ? 'found' : ''}`}
                        id='item-5'
                    >

                    </div>

                    <div
                        onClick={() => itemClick(5)}
                        className={`item ${hunt[5] !== null ? 'found' : ''}`}
                        id='item-6'
                    >
                    </div>

                    <div
                        onClick={() => itemClick(6)}
                        className={`item ${hunt[6] !== null ? 'found' : ''}`}
                        id='item-7'
                    >
                    </div>

                    <div
                        onClick={() => itemClick(7)}
                        className={`item ${hunt[7] !== null ? 'found' : ''}`}
                        id='item-8'
                    >
                    </div>


                </div>

            </div>


            <div className='scavenger-control-panel' >
                <div className='scavenger-hunt-control'
                >
                    <div id='scavenger-control-1'>
                        <div id='items-list'>

                            <div className='item-icon' style={{ backgroundImage: `url(/images/scavenger-hunt/tree.png)` }}>
                                {hunt[0] === null ? (
                                    <h3></h3>
                                ) : (
                                    <img className='check-mark' src={'images/check-mark.png'}></img>
                                )}
                            </div>

                            <div className='item-icon' style={{ backgroundImage: `url(/images/scavenger-hunt/cake.png)` }}>
                                {hunt[1] === null ? (
                                    <h3></h3>
                                ) : (
                                    <img className='check-mark' src={'images/check-mark.png'}></img>
                                )}
                            </div>

                            <div className='item-icon' style={{ backgroundImage: `url(/images/scavenger-hunt/glasses.png)` }}>
                                {hunt[2] === null ? (
                                    <h3></h3>
                                ) : (
                                    <img className='check-mark' src={'images/check-mark.png'}></img>
                                )}
                            </div>

                            <div className='item-icon' style={{ backgroundImage: `url(/images/scavenger-hunt/pickles.png)` }}>
                                {hunt[3] === null ? (
                                    <h3></h3>
                                ) : (
                                    <img className='check-mark' src={'images/check-mark.png'}></img>
                                )}
                            </div>

                            <div className='item-icon' style={{ backgroundImage: `url(/images/scavenger-hunt/lawnmower.png)` }}>
                                {hunt[4] === null ? (
                                    <h3></h3>
                                ) : (
                                    <img className='check-mark' src={'images/check-mark.png'}></img>
                                )}
                            </div>

                            <div className='item-icon' style={{ backgroundImage: `url(/images/scavenger-hunt/panda.png)` }}>
                                {hunt[5] === null ? (
                                    <h3></h3>
                                ) : (
                                    <img className='check-mark' src={'images/check-mark.png'}></img>
                                )}
                            </div>
                            <div className='item-icon' style={{ backgroundImage: `url(/images/scavenger-hunt/note.png)` }}>
                                {hunt[6] === null ? (
                                    <h3></h3>
                                ) : (
                                    <img className='check-mark' src={'images/check-mark.png'}></img>
                                )}
                            </div>
                            <div className='item-icon' style={{ backgroundImage: `url(/images/scavenger-hunt/chandlier.png)` }}>
                                {hunt[7] === null ? (
                                    <h3></h3>
                                ) : (
                                    <img className='check-mark' src={'images/check-mark.png'}></img>
                                )}
                            </div>
                        </div>
                    </div>
                    <div id='scavenger-control-2'>

                        <svg className='wheel' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200.77 200.77">
                            <defs>
                                <style>

                                </style>
                            </defs>
                            <path className={`wheel-slice a ${foundItemsCount >= 8 ? 'find-count' : ''}`} d="M308.32,174.91l17.13-17.12a100.09,100.09,0,0,0-71-29.41V152.6A75.93,75.93,0,0,1,308.32,174.91Z" transform="translate(-154.08 -128.38)" />
                            <path className={`wheel-slice a ${foundItemsCount >= 6 ? 'find-count' : ''}`} d="M330.63,228.77a75.91,75.91,0,0,1-22.31,53.86l17.12,17.12a100,100,0,0,0,29.41-71H330.63Z" transform="translate(-154.08 -128.38)" />
                            <path className={`wheel-slice a ${foundItemsCount >= 3 ? 'find-count' : ''}`} d="M178.29,228.77H154.08a100.08,100.08,0,0,0,29.4,71l17.12-17.12A75.93,75.93,0,0,1,178.29,228.77Z" transform="translate(-154.08 -128.38)" />
                            <path className={`wheel-slice a ${foundItemsCount >= 5 ? 'find-count' : ''}`} d="M308.32,282.63a75.93,75.93,0,0,1-53.86,22.31v24.21a100,100,0,0,0,71-29.4Z" transform="translate(-154.08 -128.38)" />
                            <path className={`wheel-slice a ${foundItemsCount >= 4 ? 'find-count' : ''}`} d="M254.46,304.94a75.91,75.91,0,0,1-53.86-22.31l-17.12,17.12a100.05,100.05,0,0,0,71,29.4h0V304.94Z" transform="translate(-154.08 -128.38)" />
                            <path className={`wheel-slice a ${foundItemsCount >= 7 ? 'find-count' : ''}`} d="M330.63,228.77h24.22a100.08,100.08,0,0,0-29.4-71l-17.13,17.12A75.93,75.93,0,0,1,330.63,228.77Z" transform="translate(-154.08 -128.38)" />
                            <path className={`wheel-slice a ${foundItemsCount >= 1 ? 'find-count' : ''}`} d="M254.46,152.6h0V128.38h0a100,100,0,0,0-71,29.41l17.12,17.12A75.91,75.91,0,0,1,254.46,152.6Z" transform="translate(-154.08 -128.38)" />
                            <path className={`wheel-slice a ${foundItemsCount >= 2 ? 'find-count' : ''}`} d="M200.6,174.91l-17.12-17.12a100,100,0,0,0-29.4,71h24.21A75.93,75.93,0,0,1,200.6,174.91Z" transform="translate(-154.08 -128.38)" />

                            <text fill='white' x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="wheel-text">
                                {foundItemsCount} / 8
                            </text>
                        </svg>


                    </div>


                </div>



            </div>


        </div>
    )
}

export default ScavengerHunt

