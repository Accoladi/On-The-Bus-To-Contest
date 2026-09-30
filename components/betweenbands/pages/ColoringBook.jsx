import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import html2canvas from 'html2canvas';
import download from 'downloadjs';
import Flag1 from '../color-templates/flag-1';
import Flag2 from '../color-templates/Flag2';
import Flag3 from '../color-templates/Flag3';
import Flag4 from '../color-templates/Flag4';
import Flag5 from '../color-templates/Flag5';
import Flag6 from '../color-templates/Flag6';
import Flag7 from '../color-templates/Flag7';
import Flag8 from '../color-templates/Flag8';
import Flag9 from '../color-templates/Flag9';
import Flag10 from '../color-templates/Flag10';
import Flag11 from '../color-templates/Flag11';
import Flag12 from '../color-templates/Flag12';
import Hat1 from '../color-templates/Hat-1';
import Hat2 from '../color-templates/Hat2';
import colors from '../colors';



function ColoringBook() {

    const coloringBookRef = useRef(null);

    const [activeZoom, setActiveZoom] = useState(false);

    const [zoomLevel, setZoomLevel] = useState(1);


    const [instructions, setInstructions] = useState(true);

    const hideInstructions = () => {
        setInstructions(false);
    }


    const toggleZoom = () => {
        setActiveZoom(!activeZoom)
    }


    const handleZoomClick = (event) => {
        if (activeZoom && coloringBookRef.current) {
            const rect = coloringBookRef.current.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width;
            const y = (event.clientY - rect.top) / rect.height;

            setZoomLevel(zoomLevel + 0.1);

            const container = coloringBookRef.current;
            const deltaX = container.clientWidth * 0.1 * x;
            const deltaY = container.clientHeight * 0.1 * y;

            container.style.transformOrigin = `${x * 100}% ${y * 100}%`;
            container.style.transform = `scale(${zoomLevel})`;
            container.scrollLeft = deltaX;
            container.scrollTop = deltaY;
        }
    };

    const resetZoom = () => {

        if (activeZoom === true) {
            setZoomLevel(1)
            toggleZoom();
        }
        setZoomLevel(1)
    }




    // const handleSaveClick = () => {
    //     resetZoom();
    //     if (coloringBookRef.current) {
    //         html2canvas(coloringBookRef.current, {
    //             useCORS: true,
    //             backgroundColor: null,
    //         })
    //             .then((canvas) => {

    //                 const imageDataURL = canvas.toDataURL();
    //                 download(imageDataURL, 'coloring_book.png', 'image/png');
    //             });
    //     }
    // };

    const handleSaveClick = () => {
        resetZoom();
        if (coloringBookRef.current) {
            html2canvas(coloringBookRef.current, {
                useCORS: true,
                backgroundColor: null,
                scale: window.devicePixelRatio || 1,
            })
                .then((canvas) => {
                    const imageDataURL = canvas.toDataURL('image/png');

                    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                        const a = document.createElement('a');
                        a.href = imageDataURL;
                        a.download = 'coloring_book.png';
                        a.style.display = 'none';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                    } else {
                        download(imageDataURL, 'coloring_book.png', 'image/png');
                    }
                });
        }
    };





    const { id } = useParams();
    const selectedTemplate = Number(id) || 1;
    const [selectedColor, setSelectedColor] = useState(1);
    const [menu, setMenu] = useState(1);
    const [stroke, setStrokeValue] = useState(21);

    const [selectedStroke, setStroke] = useState('black');


    const displayFillMenu = () => {
        setMenu(1)
    }

    const displayStrokeMenu = () => {
        setMenu(2)
    }

    const selectColorClick = (id) => {
        if (activeZoom === true) {
            toggleZoom();
        }
        setSelectedColor(id)
    }

    const changeStrokeValue = (id) => {
        if (menu === 2) {
            setStrokeValue(id);
        }
    };

    const changeStrokeClick = (id) => {
        if (menu === 2) {
            const selectedHexColor = colors.find((color) => color.id === id)?.color;
            if (selectedHexColor) {
                setStroke(selectedHexColor);
                changeStrokeValue(id);
            }
        }
    };




    function getColorById(id) {
        const selectedHexColor = colors.find((color) => color.id === id)?.color;
        return selectedHexColor || 'defaultColor';
    }



    const onPathClick = (event) => {
        if (!activeZoom) {
            if (
                event.target.tagName === 'path' ||
                event.target.tagName === 'polyline' ||
                event.target.tagName === 'polygon' ||
                event.target.tagName === 'circle'
            ) {
                const element = event.target;
                const id = selectedColor;
                const selectedHexColor = colors.find((color) => color.id === id)?.color;

                if (selectedHexColor) {
                    element.setAttribute('fill', selectedHexColor);
                }
            }
        }
    };






    const selectedFlag = {
        1: <Flag1 key={1} selectedColor={selectedColor} selectedStroke={selectedStroke} onPathClick={onPathClick} />,
        2: <Flag2 key={2} selectedColor={selectedColor} selectedStroke={selectedStroke} onPathClick={onPathClick} />,
        3: <Flag3 key={3} selectedColor={selectedColor} selectedStroke={selectedStroke} onPathClick={onPathClick} />,
        4: <Flag4 key={4} selectedColor={selectedColor} selectedStroke={selectedStroke} onPathClick={onPathClick} />,
        5: <Flag5 key={5} selectedColor={selectedColor} selectedStroke={selectedStroke} onPathClick={onPathClick} />,
        6: <Flag6 key={6} selectedColor={selectedColor} selectedStroke={selectedStroke} onPathClick={onPathClick} />,
        7: <Flag7 key={7} selectedColor={selectedColor} selectedStroke={selectedStroke} onPathClick={onPathClick} />,
        8: <Flag8 key={8} selectedColor={selectedColor} selectedStroke={selectedStroke} onPathClick={onPathClick} />,
        9: <Flag9 key={9} selectedColor={selectedColor} selectedStroke={selectedStroke} onPathClick={onPathClick} />,
        10: <Flag10 key={10} selectedColor={selectedColor} selectedStroke={selectedStroke} onPathClick={onPathClick} />,
        11: <Flag11 key={11} selectedColor={selectedColor} selectedStroke={selectedStroke} onPathClick={onPathClick} />,
        12: <Flag12 key={12} selectedColor={selectedColor} selectedStroke={selectedStroke} onPathClick={onPathClick} />,
        13: <Hat1 key={13} selectedColor={selectedColor} selectedStroke={selectedStroke} onPathClick={onPathClick} />,
        14: <Hat2 key={14} selectedColor={selectedColor} selectedStroke={selectedStroke} onPathClick={onPathClick} />
    }[id];



    return (
        <div id='coloring-book-main'>
            {!instructions ? (
                <></>
            ) : (
                <div id='coloring-book-instrutions'>
                    <div id='instructions-background'>
                    </div>
                    <div id='instructions-content'>
                        <h2>Coloring Book</h2>
                        <p>Welcome to our interactive coloring book! To begin, navigate to the color menu, which is initially set to the fill option. Choose a color from the palette and simply click on any area of the image to apply the selected fill color. If you wish to modify the outline color, switch to the outline tab and make your color selection. Zooming into specific areas is easy – just click the zoom button and then select the desired portion of the image. To revert to the original view, use the zoom out button. Once your masterpiece is complete, click the save button to download the customized image. Ready to unleash your creativity? Click the button below to get started!</p>
                        <button onClick={hideInstructions}>Get Started</button>
                    </div>
                </div>
            )}
            <div className={`flag-container-outer ${instructions ? 'cloring-book-blur' : ''}`} style={{ overflow: 'hidden' }}>
                <div ref={coloringBookRef} className='flag-container' style={{ transform: `scale(${zoomLevel})` }} onClick={handleZoomClick}>
                    {selectedFlag}
                </div>
            </div>

            <div id='color-control' className={`${instructions ? 'cloring-book-blur' : ''}`}>
                <div className='fill-stroke' style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div className={`fill-tab ${menu === 1 ? 'active-fill-tab' : ''}`} onClick={displayFillMenu}>
                        <p>Fill</p>
                        <div style={{ backgroundColor: getColorById(selectedColor), width: '15px', height: '15px', border: '1px solid white' }}></div>
                    </div>

                    <div className={`stroke-tab ${menu === 2 ? 'active-fill-tab' : ''}`} onClick={displayStrokeMenu}>
                        <p>Outline</p>

                        <div style={{ backgroundColor: `${selectedStroke}`, border: '1px solid white', width: '15px', height: '15px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <div style={{ width: '40%', height: '40%', backgroundColor: 'white' }}></div>
                        </div>

                    </div>
                </div>
                <div id='color-pallete'>


                    {colors.map((color) => (


                        <div className={`color-container ${menu === 1 && color.id === selectedColor ? 'active-color' : ''} ${menu === 2 && color.id === stroke ? 'selected-stroke-color' : ''}`}>


                            <div
                                className='color'
                                key={color.id}
                                color={color}
                                style={{ backgroundColor: `${color.color}` }}
                                // onClick={() => selectColorClick(color.id)}
                                onClick={() => (menu === 1 ? selectColorClick(color.id) : changeStrokeClick(color.id))}
                            >

                                {menu === 2 ? (
                                    <div className='stroke-center' > </div>
                                ) : (
                                    <></>
                                )}
                            </div>


                        </div>

                    ))}

                </div>
                <div style={{ display: 'flex', marginTop: '1em', gap: '10px' }}>
                    <div onClick={handleSaveClick} className='save-share-btn'>
                        <img src={'/content/images/download-icon.png'} height='17px'></img>
                        <p>Save</p>
                    </div>
                    <div className={`zoom-btn ${activeZoom ? 'zoom-btn-active' : ''}`} onClick={() => setActiveZoom(!activeZoom)}>
                        <img src={'/content/images/zoom-in.png'} height='20px'></img>
                    </div>
                    <div className='zoom-btn' onClick={resetZoom}>
                        <img src={'/content/images/zoom-out.png'} height='20px'></img>
                    </div>
                    <Link style={{ textDecoration: 'none' }} href='/activities/coloring'>
                        <div className='new-temp'>
                            <p>New Template</p>
                        </div>
                    </Link>

                </div>
            </div>

        </div>
    );
}

export default ColoringBook;
