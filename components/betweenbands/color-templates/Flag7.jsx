import React, { useState } from 'react'

const Flag7 = ({ selectedColor, onPathClick, selectedStroke }) => {

    const [isClicked, setIsClicked] = useState(new Array(94).fill(false));

    const handleClick = (event, index) => {
        onPathClick(event);


        setIsClicked((prevIsClicked) =>
            prevIsClicked.map((clicked, i) => (i === index ? !clicked : clicked))
        );
    };
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 561.55 441.48"
            className='svg-temp'
        >
            <defs>
                <style>
                    {
                        `
                     .b,.c,.d{stroke:${selectedStroke};stroke-miterlimit:10;}.b{stroke - width:5px;}.c,.d{stroke - width:3px;}

                    `
                    }
                </style>
            </defs>
            <path className="a" d="M115.21,436.14h15.2c73.52.05,147.07-1.19,220.54.63,48.79,1.21,97.79,4.4,146.1,11.05,57.36,7.9,112,25.74,158.43,62.66,6.44,5.11,12.76,10.37,20.1,16.35.5-3.66.84-5,.84-6.32q.11-177.55.34-355.1c0-9.15-4.24-13.08-11.65-15.7-26.8-9.46-53.27-20.06-80.47-28.16A815.48,815.48,0,0,0,372.16,88.14c-56.6-1.47-113.23-2-169.86-2.63-28.83-.34-57.68-.06-87.09-.06Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[93] ? selectedColor : 'white'}
            />
            <path className="a" d="M653.55,160.7c-32.62-10.74-64.78-23.08-97.84-32.23-72.88-20.17-147.57-27.34-223.06-27.18-60.3.13-120.6,0-181.37,0V421.21L658.69,163A25.17,25.17,0,0,0,653.55,160.7Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[0] ? selectedColor : 'white'}
            />
            <path className="a" d="M658.69,163,151.28,421.21c9.57,0,18.09-.11,26.61,0,84.33,1.33,168.73,1,253,4.6,63.49,2.71,125.84,14.72,183.88,42.59,16.34,7.85,31.75,17.62,48.34,26.94.5-5,1.32-9.5,1.33-14q.23-153.15.42-306.3C664.83,168.9,662.65,165.35,658.69,163Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[1] ? selectedColor : 'white'}
            />
            <line className="b" x1="549.61" y1="74.5" x2="36.06" y2="335.87" />
            <path className="a" d="M139.16,422.23h-14V101.43l14-.91Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[2] ? selectedColor : 'white'}
            />
            <path className="c" d="M465.12,377.48a116.29,116.29,0,0,1-18.67,12.92,27.18,27.18,0,0,1-12.18,3.17c-7.38.32-14.53,1.77-21.74,3.23-31.68,6.45-61.27-.06-89.38-15-1.95-1-4.09-1.85-5.68-3.5,1.5-2.21,3.87-2,6.07-2,6.59-.09,13.19,0,19.78,0q56.57,0,113.12,0C459.37,376.22,462.44,375.65,465.12,377.48Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[3] ? selectedColor : 'white'} />
            <path className="c" d="M465.12,377.48c-2.22,0-4.43-.08-6.65-.08q-67.39,0-134.78,0a20.06,20.06,0,0,0-6.22.9A78.91,78.91,0,0,1,301.29,367c-.8-2.28.8-2.84,2.42-3.27a17.43,17.43,0,0,1,4.45-.27c21.74-.06,43.48.1,65.21-.08a12.53,12.53,0,0,1,4.43.44c8.78,2.6,17.58,5,26.82,5.55a97.85,97.85,0,0,0,36.24-4.81c.93-.31,1.9-.5,2.85-.74a20.77,20.77,0,0,1,8-1.1c7.31.08,14.61,0,21.92,0a31,31,0,0,1,3.34.09c1.11.11,2.38.14,2.94,1.25.77,1.53-.9,2.06-1.5,3A96.18,96.18,0,0,1,465.12,377.48Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[4] ? selectedColor : 'white'} />
            <path className="c" d="M479.24,151.77a39.58,39.58,0,0,1,9.61,7.51c-2.9.94-5.9.41-8.83.42q-83,.11-166,0c-2.81,0-5.74.37-8.35-1.21a38.63,38.63,0,0,1,9.75-6.7,25.78,25.78,0,0,1,8.81-1.19H472.69A15.41,15.41,0,0,1,479.24,151.77Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[94] ? selectedColor : 'white'}
            />
            <path className="c" d="M340.78,138.32a41.42,41.42,0,0,1,12.34-5.06c4.93-1.31,10-2.2,14.2-5.38a4.41,4.41,0,0,1,2.47-.6c26.71-.45,53.21,1.09,78.93,9.18,1.51.48,3.16.73,4.43,1.84-2.09,2.39-5,2-7.63,2q-29,.08-58.08,0c-13.4,0-26.81,0-40.21,0C344.92,140.29,342.42,140.62,340.78,138.32Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[5] ? selectedColor : 'white'} />
            <path className="c" d="M479.24,151.77l-156,0-7.77,0a44.22,44.22,0,0,1,10.34-6,17.28,17.28,0,0,1,6.94-1.16q64.77,0,129.55,0a23.22,23.22,0,0,1,7.32,1.17A34.67,34.67,0,0,1,479.24,151.77Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[6] ? selectedColor : 'white'} />
            <path className="c" d="M469.59,145.78H325.78a70,70,0,0,1,15-7.46,20,20,0,0,0,6.22.83q47.53,0,95.07,0c3.71,0,7.44.23,11.08-.83A63.43,63.43,0,0,1,469.59,145.78Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[7] ? selectedColor : 'white'}
            />
            <path className="c" d="M491.89,324.58a81.82,81.82,0,0,1-20.23,11.2c-.29-2.59,2.43-2.39,3.92-4.34H398.42c.9,1,2.71,1.06,2.22,2.84a121.68,121.68,0,0,1-21-8c-.67-1.19-2.07-1.11-3.06-1.76v0c-.05-2,1.47-2.37,3-2.66a21.45,21.45,0,0,1,4.09-.19c33.77.12,67.54-.07,101.32,0a19.16,19.16,0,0,1,4.08.21C490.53,322.18,492.11,322.47,491.89,324.58Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[8] ? selectedColor : 'white'}
            />
            <path className="d" d="M348.54,346l12.78,9.64c-1.78,3-4.8,2.74-7.59,2.77-10.42.1-20.84,0-31.25,0q-13.39,0-26.79,0c-2.3,0-4.44-.32-6.18-2a18,18,0,0,1-4.7-4.95,4.8,4.8,0,0,0-.68-1.31c-.71-1.1-2.65-1.83-2-3.25.75-1.66,2.78-1.29,4.34-1.3,19.85-.16,39.7.18,59.55-.21A6,6,0,0,1,348.54,346Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[9] ? selectedColor : 'white'} />
            <path className="c" d="M491.89,324.58c-.69-1.78-2.21-1.72-3.74-1.72H380.43c-1.54,0-3,0-3.82,1.65A30.53,30.53,0,0,1,366.28,317c-1.39-2-.67-3.17,1.45-3.8a15.2,15.2,0,0,1,4.41-.38c6.54,0,13.1.24,19.63-.09,4.35-.22,7.69,1,10.3,4.45a9.6,9.6,0,0,0,1.79,1.87l-.12-.09c2.29,1.58,5,1.36,7.47,1.24,8.44-.42,16.94-.28,25.29-1.89l-.06,0c2.77-.46,5.62-.45,8.28-1.52l-.06,0c5.1-1.74,10.27-.41,15.41-.39,11.17.05,22.34,0,33.5,0a14.64,14.64,0,0,1,4.07.3c1.07.3,2.26.62,1.62,2.22C496.67,320.68,494.75,323.25,491.89,324.58Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[10] ? selectedColor : 'white'} />
            <path className="d" d="M464.25,263.38q-1.53,3.22-3.08,6.46C459,268,456.41,268,453.79,268q-42.87,0-85.73,0c-3.2,0-6.47.28-9.49-1.22l3.09-6a10.13,10.13,0,0,1,1.29-.72,9.12,9.12,0,0,1,2.94-.39c20.4-.06,40.79,0,61.18,0a8.9,8.9,0,0,1,3.69.36l5.79,1.45a1.21,1.21,0,0,0,1.32.46c7.59-3,15.48-1,23.22-1.38C462.66,260.5,464.83,260.61,464.25,263.38Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[11] ? selectedColor : 'white'} />
            <path className="c" d="M289.51,356.44a15.5,15.5,0,0,0,5.46.81q29.41-.06,58.82,0a16.1,16.1,0,0,0,7.53-1.65l16.48,8.25c-3.76,1.1-7.62.83-11.46.83q-30.4,0-60.81,0c-1.81,0-3.94-.47-4.24,2.33A58.5,58.5,0,0,1,289.51,356.44Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[12] ? selectedColor : 'white'} />
            <path className="c" d="M401.4,200.45l-8.93,0c-1.66-.74-3.41-.48-5.13-.47q-19.29.09-38.57,0c-2.67,0-5.46.34-7.94-1.14a36.69,36.69,0,0,1,10.45-6,24.11,24.11,0,0,1,8.05-1.19q36.87,0,73.75,0c2.24,0,4.49-.11,6.49,1.19a21.83,21.83,0,0,1,4.63,6c-1.95,1.49-4.25,1.15-6.44,1.16q-16,.09-32,0A11.1,11.1,0,0,0,401.4,200.45Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[13] ? selectedColor : 'white'}
            />
            <path className="d" d="M411.11,278.93c-7-1.78-13.92-3.49-21.15-4-3.26-.24-4.5.95-4.84,3.92-.44,3.8-1,7.59-1.53,11.39-2-2.71-1.07-5.73-1-8.67.91-4.31.72-4.61-3.38-4.63-6.41,0-12.82,0-19.23,0-2.29,0-3.92.55-3.84,3.24a29.49,29.49,0,0,0,.63,6.14,18.77,18.77,0,0,1-.22,5.79,2.27,2.27,0,0,1-.78,1,61.28,61.28,0,0,1-.87-21.05c1.55-2.09,3.71-2.66,6.22-2.66,30.92,0,61.85,0,92.77.09,2.4,0,5.84-.77,5.83,3.56a6.29,6.29,0,0,1-2.24,3.67c-5.94.54-11.89.17-17.84.21-9.76.07-19.52,0-29.39,0C410.69,277.67,411.53,278.06,411.11,278.93Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[14] ? selectedColor : 'white'}
            />
            <path className="c" d="M322.34,304.92a26.27,26.27,0,0,1,2.22,6.74c-17.67-.67-35.36-.15-53-.33a14.48,14.48,0,0,0-6.85,1.23,12,12,0,0,1-.77-5.87,8,8,0,0,1,.12-5c1.4-1.06,3.06-.94,4.66-.94,15.79,0,31.58,0,47.37,0C319.12,300.75,321.81,301.16,322.34,304.92Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[15] ? selectedColor : 'white'}
            />
            <path className="d" d="M330.92,326.86q2.07,5.86,4.15,11.72c-17.77-1.16-35.54-.25-53.3-.6-2.47-.05-4.66.41-5.93,4.95a37.13,37.13,0,0,1-2.79-10.4c-1.88-11.43-1.88-11.45,4.69-11.47,16-.05,32,.26,48-.23C328.52,320.74,329.57,323.74,330.92,326.86Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[16] ? selectedColor : 'white'}
            />
            <path className="c" d="M264.05,302l-.15,4.72c-1.22-5.14-.39-10.18.74-15.21,1.39-5.54,1.48-5.64,7.55-5.64q21.18,0,42.36,0c1.83,0,3.74-.24,5.39.93a22.77,22.77,0,0,1,.18,8.55c-1.7,1.41-3.76,1.06-5.7,1.06-13.36,0-26.73.15-40.1,0C269.63,296.27,265.42,296.31,264.05,302Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[17] ? selectedColor : 'white'}
            />
            <path className="c" d="M439.57,192.88H351.28a53,53,0,0,1,15.6-6,15.6,15.6,0,0,1,4.77-.35c18-.17,35.91.15,53.86-.13a14.13,14.13,0,0,1,5.12.51C435.17,186.57,437.79,189.1,439.57,192.88Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[18] ? selectedColor : 'white'}
            />
            <path className="c" d="M430.76,260.05a20.43,20.43,0,0,1-6.23.85q-31-.06-61.95,0c.43-5.63,2.63-7.87,7.95-7.88q23.5-.06,47,0c1.75,0,3.5,0,5,1.09A33,33,0,0,0,430.76,260.05Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[19] ? selectedColor : 'white'}
            />
            <path className="d" d="M348.54,346c-3.63,1-7.35.8-11.05.8h-55c.28,2.09,2.77,2.67,2.34,4.72a35.38,35.38,0,0,1-6.67-8.35c-1.21-1.82-.86-3,1.42-3.32a29,29,0,0,1,4.47-.19c17,0,34.07.1,51.1-.07,4.38,0,8.12.6,10.81,4.36a4.4,4.4,0,0,0,1.78,1.33Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[20] ? selectedColor : 'white'}
            />
            <path className="c" d="M460.92,311.56l11.16-6.72c3.49-3.88,8.08-3.39,12.65-3.32,8.54.12,17.08-.09,25.61.12,1.92,0,5.08-.55,3.9,3.4-2.44,3-4.9,6-8.26,8.09-8.53-.68-17.08-.15-25.63-.31-5.2-.09-10.41.19-15.61-.24C463.41,312.47,462,312.73,460.92,311.56Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[21] ? selectedColor : 'white'}
            />
            <path className="c" d="M264.05,302c.09-1,.23-2,.27-2.94.14-3,1.57-3.92,4.69-3.88,17,.18,34,.08,51,.08.43.07.5.51.78.74.52,3,1,6,1.57,8.95-1.12-2.35-2.84-3.07-5.54-3C299.22,302,281.64,302,264.05,302Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[22] ? selectedColor : 'white'}
            />
            <path className="d" d="M403.86,319c-.24-.07-.59-.07-.69-.23-3.57-5.39-9-5.09-14.5-4.93-6.43.17-12.87,0-19.3,0-2,0-3.83.27-3.09,3.07a24.77,24.77,0,0,1-6.72-10.46c-.79-2.11-.47-3.91,2.07-4,8.85-.31,17.7-.68,26.54.11A111.66,111.66,0,0,1,403.86,319Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[23] ? selectedColor : 'white'}
            />
            <path className="c" d="M501.5,342.93c-2.86,4.1-4.39,9.18-8.88,12.09-1.19.6-2.22,1.53-3.72,1.41-7.5-.62-15-.09-22.53-.35-1.38-.05-3.07.25-3.67-1.68A125.66,125.66,0,0,1,476,345.22a58.63,58.63,0,0,0,7.54-4.6l-.06.06c4.8-1.63,9.74-1.11,14.64-.84C499.77,339.93,502,340.14,501.5,342.93Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[24] ? selectedColor : 'white'}
            />
            <path className="c" d="M408.76,337.37c.64-1.78,2.11-1.81,3.66-1.81h52.12a5.27,5.27,0,0,1,4.08,1.4c-.71.2-1,1.2-2,.94-2.09.7-4.32,1-6.19,2.31-13.37,5.94-26.86,5.29-40.41.73a89.66,89.66,0,0,0-9.74-3.11A1.49,1.49,0,0,1,408.76,337.37Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[25] ? selectedColor : 'white'}
            />
            <path className="c" d="M326.09,315.36a20.25,20.25,0,0,1-6.2.81c-16.71,0-33.42,0-50.13-.06-2.34,0-3.94.3-3.57,3.14a14.77,14.77,0,0,1-1.52-6.69c-.05-1.67.64-2.42,2.43-2.41q27.13.06,54.26,0a4.82,4.82,0,0,1,3.2,1.53A7.5,7.5,0,0,1,326.09,315.36Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[26] ? selectedColor : 'white'}
            />
            <path className="c" d="M299.16,163.79l74,0c-9.8,1.83-19.65,3.42-29.33,5.85-14,.95-28,.32-42,.47-2.71,0-5.47.13-8-1.15A19.72,19.72,0,0,1,299.16,163.79Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[27] ? selectedColor : 'white'}
            />
            <path className="c" d="M535.93,271.51a17.05,17.05,0,0,1-2.93,6.06,17.93,17.93,0,0,0-7.93-1.44c-9.4.08-18.79,0-28.19,0-2.17,0-4.25.11-5.37,2.41a4.28,4.28,0,0,1-.86.94,1,1,0,0,1-1.19,0l2.22-7.47c1.43-5.59,1.43-5.61,7.54-5.63,10.46,0,20.91,0,31.37,0,.62,0,1.24,0,1.87,0C537,266.63,537.29,267.09,535.93,271.51Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[28] ? selectedColor : 'white'}
            />
            <path className="c" d="M425.45,164.15c1.29-.68,2.69-.35,4-.36q32.06-.09,64.1-.13a21.19,21.19,0,0,1,5.1,5.29c-1.25,1.35-2.93,1.22-4.52,1.23-14.76,0-29.53,0-44.29,0-1.5,0-2.94-.54-4.44-.36C439,167.07,432.2,165.73,425.45,164.15Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[29] ? selectedColor : 'white'}
            />
            <path className="c" d="M462.7,354.4c3,1.23,6.05.37,9.08.57,6,.39,12-.65,18,.61.88.18,1.9-.36,2.85-.56a93.91,93.91,0,0,1-14.2,12.14c1.45-2.19,1.59-3.31-1.76-3.27-11,.13-22,0-32.94,0C450.17,361,456.55,357.91,462.7,354.4Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[30] ? selectedColor : 'white'}
            />
            <path className="c" d="M267.78,281.05c-.08.65-.24,1.25-1,1.43A38.9,38.9,0,0,1,272,269.77c1.73-1.28,3.75-1.12,5.72-1.13q18.94,0,37.88,0c6.66,0,7.18.73,5.36,7.07-1.59,1.65-3.68,1.23-5.61,1.24-12,.05-24.07.12-36.1,0C274.82,276.86,270.62,276.9,267.78,281.05Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[31] ? selectedColor : 'white'}
            />
            <path className="c" d="M320.72,275.82c1-6,1-6-5-6L272,269.77a13.76,13.76,0,0,1,2.9-5.23c1.69-1.88,3.94-1.87,6.2-1.87,12.2,0,24.39,0,36.58,0,5.34,0,5.36.09,4.91,5.11a4.5,4.5,0,0,1-.32,2.18l-1.47,10.48a3.13,3.13,0,0,1-.93-2.92A3.39,3.39,0,0,1,320.72,275.82Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[32] ? selectedColor : 'white'}
            />
            <path className="c" d="M340.83,198.85c2.44-.92,4.87.09,7.31.07q20.88-.13,41.77,0c.86,0,3.2-1.41,2.56,1.52a130.41,130.41,0,0,0-23.15,6.08c-1.24-.82-2.64-.55-4-.55-9.2,0-18.4,0-27.61,0-1.81,0-3.78.36-5.25-1.22A30.85,30.85,0,0,1,340.83,198.85Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[33] ? selectedColor : 'white'}
            />
            <path className="c" d="M510,183.11a22.53,22.53,0,0,1,4.51,6.77,4.06,4.06,0,0,1-2.85.5c-11.74-.18-23.49,0-35.23-.08-1.73,0-3.5-.21-4.81,1.32A37.19,37.19,0,0,1,463.4,184c.39-2.08,2.16-1.87,3.52-1.88,13.18-.16,26.35-.12,39.53-.05A6.48,6.48,0,0,1,510,183.11Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[34] ? selectedColor : 'white'}
            />
            <path className="c" d="M530.68,281.88a19.46,19.46,0,0,1-3.63,6.12c-12.93.32-25.85.29-38.78,0a5,5,0,0,1-3.5-1l3.21-4.43c1-.83,1.12-2.31,2.32-3h0a4.4,4.4,0,0,1,2.16-.47c11.26.11,22.52-.06,33.78.1C528.11,279.21,530.4,279,530.68,281.88Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[35] ? selectedColor : 'white'}
            />
            <path className="c" d="M514.24,305c0-1.43-.39-2.33-2.1-2.35-11.77-.18-23.55.39-35.33-.28-1.9-.11-2.48,2.9-4.73,2.43l7.6-8.15c1.29-1.65,3.11-1.88,5-1.88,10.28,0,20.55-.09,30.82,0,2,0,4.42-.26,4.83,2.75v-.05a9.85,9.85,0,0,0-2.36,3A13,13,0,0,1,514.24,305Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[36] ? selectedColor : 'white'}
            />
            <path className="c" d="M538.91,263.27c-.49-2.49-2.49-1.61-3.91-1.61-13.89-.06-27.79,0-41.69,0a9.4,9.4,0,0,1,.13-6.3,5.94,5.94,0,0,1,3.58-.85c13.06-.06,26.12,0,39.18,0a6.09,6.09,0,0,1,4.22,1.19A16.82,16.82,0,0,1,538.91,263.27Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[37] ? selectedColor : 'white'}
            />
            <path className="d" d="M490.22,234.92a23.57,23.57,0,0,1-1.48-7.47c-1-3,.34-4.25,3.17-4.28,12.91-.15,25.83-.1,38.74,0,2.93,0,3.52,2.25,4.65,4.09a6.34,6.34,0,0,1,1.5,3.75c-1,.71-2.13.51-3.23.5-12.14-.13-24.27.06-36.4-.11C494.05,231.32,491.62,231.93,490.22,234.92Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[38] ? selectedColor : 'white'}
            />
            <path className="d" d="M540.42,245.19H499c-6.33,0-6.33,0-6.53,6.2a19.33,19.33,0,0,1-.7-6.89,6.16,6.16,0,0,1,.18-4.87c1.44-1,3.09-.85,4.69-.85q18.66,0,37.32,0c2.1,0,4.31-.19,5.74,1.9A7.72,7.72,0,0,1,540.42,245.19Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[39] ? selectedColor : 'white'}
            />
            <path className="d" d="M491.8,240l0,4.54a39,39,0,0,1-1.55-9.58c-.51-3.63.79-4.86,4.68-4.77,12.39.28,24.79.11,37.18.09a10.42,10.42,0,0,1,4.72.73,12.74,12.74,0,0,1,2,6c-13.76-.74-27.54-.13-41.31-.4C494.73,236.51,492.66,237.07,491.8,240Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[40] ? selectedColor : 'white'}
            />
            <path className="c" d="M482,201.23c-1.08-4.28-5.78-4.73-8.12-7.66.48-2,2.23-1.77,3.6-1.79,11.67-.13,23.35-.09,35,0a6.81,6.81,0,0,1,3.86,1.18,22.55,22.55,0,0,1,3.89,6.69c-1.13.73-2.39.47-3.61.46-9.39-.08-18.78,0-28.17,0A14.11,14.11,0,0,0,482,201.23Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[41] ? selectedColor : 'white'}
            />
            <path className="c" d="M493.3,255.65c0-5.23,0-5.23,5.17-5.23,12.31,0,24.63.15,36.94-.09,3.76-.07,5.63.83,5.06,4.82a.34.34,0,0,1-.05.5Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[42] ? selectedColor : 'white'}
            />
            <path className="c" d="M401.4,200.45c.41-2.29,2.24-1.53,3.56-1.54,11.12,0,22.25,0,33.38,0,2,0,3.9,0,5.86,0a21.38,21.38,0,0,1,4.47,6c-1,1.15-2.42,1.21-3.77,1.2-10-.09-20,.45-30.06-.34C410.8,202.77,406.16,201.45,401.4,200.45Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[43] ? selectedColor : 'white'}
            />
            <path className="c" d="M503.18,174.19a10,10,0,0,0-4-.72c-14.29,0-28.57,0-42.86,0-1.19,0-2.53-.39-3.44.84l-7.46-4.48c1.16-1.42,2.77-.82,4.18-.83q24.52-.09,49.07-.08A16.31,16.31,0,0,1,503.18,174.19Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[44] ? selectedColor : 'white'}
            />
            <path className="c" d="M412.08,239.89a17.36,17.36,0,0,1,6,7.49c-12.26-.58-24.52-.13-36.78-.37-4.7-.09-9.27.18-13.68,1.88a15,15,0,0,1,8.82-7.53c3.55-2.26,7.49-1.88,11.45-1.85,7,.06,13.93.3,20.89-.18A6.63,6.63,0,0,1,412.08,239.89Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[45] ? selectedColor : 'white'}
            />
            <path className="c" d="M367.66,248.89c2.66-3.17,6.16-3.09,9.93-3,11.52.21,23.05.12,34.57,0a10.38,10.38,0,0,1,6,1.48,14,14,0,0,1,2.87,4.5c-16.18-.58-32.36-.15-48.54-.31-2.07,0-4.2.56-6.22-.42A3.25,3.25,0,0,1,367.66,248.89Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[46] ? selectedColor : 'white'}
            />
            <path className="d" d="M453,281.08l-1.75,1.45c-.87.58-2,.71-2.72,1.56-6.94,3.77-14.59,4.49-22,3.4-3.63-.53-6.81-4.06-10.2-6.23-.12-2.58,1.91-2.73,3.55-2.76,9.93-.24,19.87-.26,29.8,0C451.15,278.54,453,278.76,453,281.08Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[48] ? selectedColor : 'white'}
            />
            <path className="c" d="M520.34,297.6a3.12,3.12,0,0,0-3.09-1.63c-11.56,0-23.13,0-34.7,0a12.55,12.55,0,0,0-2.87.67,10.09,10.09,0,0,1,2.17-3.75c1.19-2.52,3.2-3.4,5.94-3.39,10.82.06,21.64,0,32.46.08,1.57,0,3.62-.54,4.38,1.77C523.15,293.43,522.55,296.07,520.34,297.6Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[49] ? selectedColor : 'white'}
            />
            <path className="c" d="M283.87,251.85a22.84,22.84,0,0,1,5.22-6c1.12-.64,1.71-2.16,3.32-2,10,.39,20.11.08,30.16.18,1.12,0,2.24,0,3.36.06,2.48.13,3.78,1.06,2.55,3.73a23.11,23.11,0,0,0-.93,2.81,2.73,2.73,0,0,1-.74,2.22,12.88,12.88,0,0,0-6.12-1.3c-10.07,0-20.15.08-30.22,0C288.25,251.5,286.11,252.63,283.87,251.85Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[50] ? selectedColor : 'white'}
            />
            <path className="c" d="M308.13,184.85a65.64,65.64,0,0,0-9.8,9.49c-5-.56-10.06-.3-15.1-.32-1.21,0-2.46.3-3.6-.37a38.39,38.39,0,0,1,4.5-9,4.8,4.8,0,0,1,4.2-2.57c5.41-.13,10.82-.2,16.23,0C306.19,182.23,308.2,182.29,308.13,184.85Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[51] ? selectedColor : 'white'}
            />
            <path className="c" d="M327.55,250.64c.53-5.45.53-5.45-5.45-5.45q-13.07,0-26.14,0a7.76,7.76,0,0,1-4.34-.76c.13-2.42,2.5-3,3.7-4.6l1-1.37a5.43,5.43,0,0,1,1.39-.15c8.74,1,17.52.25,26.28.49a33.49,33.49,0,0,1,4.81.15c1.12.2,2.62.09,2.52,1.95A57.44,57.44,0,0,1,327.55,250.64Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[52] ? selectedColor : 'white'}
            />
            <path className="c" d="M324.48,260c-.6-2.19-2.41-1.33-3.71-1.34-10-.07-20,0-30,0-3.82,0-7.65.26-11.39-.85A4,4,0,0,1,281,255.6c1.56-2.06,3.69-2.66,6.2-2.65,11.37,0,22.75,0,34.12.07,1.76,0,4.1-.69,4.79,2.06C325.88,256.83,325.68,258.58,324.48,260Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[53] ? selectedColor : 'white'}
            />
            <path className="c" d="M344.62,218.2q-1.47,1.92-3,3.82c-7.29-.6-14.6-.17-21.9-.33-1.81,0-3.77.33-5.24-1.23a22.93,22.93,0,0,1,5.48-5.15c2.63-2.94,6-3.57,9.77-3.39,4.46.21,8.93,0,13.4.08,1.66,0,3.84-.47,4.6,1.5.64,1.64-1.4,2.38-2.22,3.54C345.26,217.44,344.92,217.81,344.62,218.2Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[54] ? selectedColor : 'white'}
            />
            <path className="c" d="M358.09,302.72a12,12,0,0,1-1.54-5.86c-.63-1.61-.18-3.29-.3-4.94s1.26-2.11,2.5-2.16a212.22,212.22,0,0,1,22.56.09,2.66,2.66,0,0,1,1.33.61c.91,2.53.38,5.12.33,7.69-1.25,1.35-2.93,1.15-4.51,1.17-4.95.07-9.92.23-14.86-.05C360.69,299.1,359,300,358.09,302.72Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[55] ? selectedColor : 'white'}
            />
            <path className="c" d="M290.12,173.48c11.7,0,23.4,0,35.1,0,1.3,0,2.78-.5,3.81.85l-15,6.82c-1,0,1.52-1.82-1.08-1.61a213.56,213.56,0,0,1-22.35.14,5.79,5.79,0,0,1-3.53-1C287.74,176.75,288.4,174.82,290.12,173.48Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[56] ? selectedColor : 'white'} />
            <path className="c" d="M442.43,237.9a27.87,27.87,0,0,1-5.31-8.88c.05-2.32,2-2.34,3.44-2.51,6.37-.76,12.77-.41,19.16-.25,2.55.07,2.81,2.39,3.83,4a21.09,21.09,0,0,1,2.77,8.23c-6.61-5-14.15-1.95-21.28-2.47C443.81,235.9,443.34,237.31,442.43,237.9Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[57] ? selectedColor : 'white'}
            />
            <path className="c" d="M442.43,237.9c-.63-2.39.23-3.29,2.74-3.21,4.67.15,9.35.21,14,0,3.27-.16,6,.12,7.14,3.77a8,8,0,0,1,.89,4.48c-1.26,1.31-2.92,1.11-4.49,1.13-3.93.07-7.87.09-11.79,0-2.63-.05-4.95.15-5.64,3.33a1.06,1.06,0,0,1-1.42.78C443.62,244.71,444.92,241,442.43,237.9Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[58] ? selectedColor : 'white'}
            />
            <path className="c" d="M525.38,208.6a11.35,11.35,0,0,1,2.48,4.41c-1.49,1.54-3.45,1.21-5.28,1.22q-14.93.08-29.87,0a16,16,0,0,0-6.92,1.15,4,4,0,0,1-.76-2.94c-.6-4.31-.23-4.94,3.9-5,10.74-.16,21.49-.07,32.24,0A7.38,7.38,0,0,1,525.38,208.6Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[59] ? selectedColor : 'white'}
            />
            <path className="c" d="M338.64,226.42c-1.75,2-1.68,5-3.69,6.84-8.32-.72-16.67-.18-25-.39-1.81,0-3.81.36-5.13-1.47,1.81-4.63,5.24-6.91,9.91-6.8,6.53.17,13.07,0,19.6.12C335.87,224.76,337.93,224,338.64,226.42Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[60] ? selectedColor : 'white'}
            />
            <path className="c" d="M463.55,230.22c-1.46-2.85-3.94-3.2-6.81-3-5.91.45-11.89-.73-17.77.74-.75.18-1.45.31-1.85,1.05a8.54,8.54,0,0,1-2.09-4c-2.13-5.36-2-5.57,4-5.6,5.09,0,10.19,0,15.28,0,2.24,0,4.19.51,5.39,2.62A24.53,24.53,0,0,1,463.55,230.22Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[61] ? selectedColor : 'white'}
            />
            <path className="c" d="M443.87,248.17c.09-.08.28-.15.28-.23-.07-5.59,3.7-5.17,7.57-5,5.16.18,10.33,0,15.49,0a21.91,21.91,0,0,1,0,12.07c-1.27-3.16-3.82-3.49-6.87-3.53-5.75-.08-11.53.69-17.26-.33Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[62] ? selectedColor : 'white'}
            />
            <path className="c" d="M382.73,298.22q0-3.74,0-7.47c-1.23-2.77-3.41-3.48-6.32-3.39-5.19.17-10.4.07-15.61,0-1.72,0-3.5.14-4.95-1.13a13.75,13.75,0,0,1-.68-6c1.17-1.14,2.68-1.16,4.15-1.17,6.65-.05,13.3-.11,19.95,0,1.54,0,3.62-.55,4.21,1.87,0,3,.07,6.11.1,9.16.76,3.13-1.25,6.64,1.29,9.54C383.39,300.32,382.65,299.86,382.73,298.22Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[63] ? selectedColor : 'white'}
            />
            <path className="c" d="M452.38,210a19.27,19.27,0,0,1,3.82,6c-9-.7-18.13.14-27.17-.65l-5.26-5.09c-.88-.86-1.06-1.67.23-2.29a7.63,7.63,0,0,1,3.27-.53c6.43,0,12.86,0,19.29,0A6.64,6.64,0,0,1,452.38,210Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[64] ? selectedColor : 'white'}
            />
            <path className="c" d="M265.41,240.7l0-.74a5.88,5.88,0,0,1,1.22-.75,31,31,0,0,1,9.12-.24c1.88.14,3.45.83,2.41,3.28-2.38,7.46-6.5,13.95-11.25,20.09-1.78-.27-1-1.69-1-2.58-.08-5.17,0-10.33-.06-15.5C265.83,243.08,266.27,241.8,265.41,240.7Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[65] ? selectedColor : 'white'}
            />
            <path className="c" d="M344.62,218.2c.05-.24.09-.48.15-.72.39-1.55,3.14-2.28,2.29-3.77s-3.17-.55-4.82-.6c-3.57-.12-7.15-.06-10.72,0-4,0-8.1-.66-11.52,2.23a29.65,29.65,0,0,1,6.72-6,9.72,9.72,0,0,1,5.17-1.88c9-.09,18.09-.11,27.13,0,1.36,0,3.11-.23,3.55,1.82-2.09,1.39-4.54,1.92-6.88,2.62C351.5,213.19,347.59,214.83,344.62,218.2Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[66] ? selectedColor : 'white'}
            />
            <path className="c" d="M279.63,193.65c5.83-1.53,11.76-.48,17.64-.64.68,0,1,.69,1.06,1.33l-4.41,8.41c-6.58-.76-13.17-1.58-19.5,1.36A53.73,53.73,0,0,1,279.63,193.65Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[67] ? selectedColor : 'white'}
            />
            <path className="c" d="M530,216.79c-2.06-1.07-4.11.11-6.17.08-11.07-.13-22.14-.08-33.21,0-1.41,0-3-.58-4.15.93a2.9,2.9,0,0,1-.65-2.37c-.14-2.86,2-2.3,3.61-2.31q19.23-.06,38.46-.07A7.54,7.54,0,0,1,530,216.79Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[68] ? selectedColor : 'white'}
            />
            <path className="c" d="M464.25,263.38c-.3-2.22-2-1.79-3.42-1.74-7.58.33-15.22-.81-22.77.67a1.39,1.39,0,0,1-1.51-.81c2.82.42,2.58-2.28,3.68-3.62a4.47,4.47,0,0,1,4.74-3.37c6.1,0,12.19-.15,18.29.06,2,.07,4.25.37,3.2,3.48A9.49,9.49,0,0,1,464.25,263.38Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[69] ? selectedColor : 'white'}
            />
            <path className="c" d="M331.32,240.91c-1-1.4-2.45-.92-3.75-.93q-13-.06-26,0c-1.76,0-3.48,0-4.77-1.46,1.55-1.81,2.64-4.21,5.57-4.17,8.75,0,17.5-.06,26.24,0,1.69,0,3.78-.6,4.74,1.68C332.44,237.57,332.79,239.63,331.32,240.91Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[70] ? selectedColor : 'white'}
            />
            <path className="c" d="M274.42,204.11c1.93-2.89,4.75-3.24,7.93-3,2.92.2,5.87,0,8.81,0,1.25,0,2.54-.11,2.76,1.63a25,25,0,0,1-2.93,6.77c-5.25.51-10.51.16-15.77.15a3.79,3.79,0,0,1-3-1.08A10.12,10.12,0,0,1,274.42,204.11Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[71] ? selectedColor : 'white'}
            />
            <path className="c" d="M412.08,239.89c-10.11,1.41-20.25,1.14-30.37.25-2-.18-3.23,2-5.23,1.22,7-5.84,15.38-6.74,23.84-5.88C404.34,235.89,409.11,235.94,412.08,239.89Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[72] ? selectedColor : 'white'}
            />
            <path className="c" d="M452.38,210a8.91,8.91,0,0,0-5.59-1.49c-7,.11-13.91,0-20.86.06-1,0-2.83-.68-2.16,1.66l-8.93-4.61c1.05-1.28,2.52-.77,3.81-.78,10-.06,20-.06,30-.08A18.08,18.08,0,0,1,452.38,210Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[73] ? selectedColor : 'white'}
            />
            <path className="c" d="M501.5,342.93c-.61-2.2-2.43-2.1-4.13-2.12-4.65-.07-9.29-.09-13.93-.13,7.26-4.91,15.52-6.84,24.05-7.92.78-.1,1.83-.46,2.17.75a1.9,1.9,0,0,1-.75,2.3C505.92,337.65,504,340.62,501.5,342.93Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[74] ? selectedColor : 'white'}
            />
            <path className="c" d="M272.2,208.59c5,0,10,0,15.07,0,1.28,0,2.74-.45,3.72.91a45.31,45.31,0,0,1-3.79,9.66c-.92-2.89-2.87-3.62-5.85-3.63-3.85,0-7.89,1.2-11.56-1A9.87,9.87,0,0,1,272.2,208.59Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[75] ? selectedColor : 'white'}
            />
            <path className="c" d="M269.79,214.52q6.43,0,12.89,0c5,0,5,0,4.52,4.62a2.52,2.52,0,0,1-.8,2.12c-2.7.67-5.45.34-8.17.28-3.46-.09-6.81,0-9.85,1.94A23.21,23.21,0,0,1,269.79,214.52Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[76] ? selectedColor : 'white'}
            />
            <path className="c" d="M266.22,240h-.78c-.17-3.6-.95-7.29,1.65-10.45a3.66,3.66,0,0,1,1.15-.76c3.64-.7,7.32-.38,11-.3s3.74.45,2.76,4.24a6.53,6.53,0,0,1-1.45,3.78c-2.42-.65-4.91-.51-7.37-.74C269.65,235.4,267.15,236.26,266.22,240Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[77] ? selectedColor : 'white'}
            />
            <path className="c" d="M282,232.69c.29-2.19,0-3.52-2.88-3.27-3.77.33-7.58.08-11.38.08.27-5.53,1-6.28,6-6.36,2.59,0,5.18-.14,7.76.06,1.35.11,3.12-.25,3.41,1.89A27,27,0,0,1,282,232.69Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[78] ? selectedColor : 'white'}
            />
            <path className="c" d="M436.5,318.29c-1.94,1.63-4.53,1.31-6.64,1.4-7.74.34-15.46,1.45-23.23.95-1.31-.08-2.5-.16-2.89-1.7,8.73,1.33,17.44.38,26.15-.17C432.1,318.63,434.3,318.45,436.5,318.29Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[79] ? selectedColor : 'white'}
            />
            <path className="c" d="M265.41,240.7c1.44,1.3.67,3,.79,4.53.46,5.69-.84,11.46.74,17.11-1.39,2.11-1.71,1-1.72-.6q0-7.2,0-14.4C265.24,245.13,265.35,242.91,265.41,240.7Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[80] ? selectedColor : 'white'}
            />
            <path className="c" d="M320.69,277.34c0,1,.09,2.07.13,3.11q0,7.76-.05,15.52l-.78-.74c0-2.73,0-5.47,0-8.2,0-2,0-4,0-6C319.23,279.62,318.34,278.18,320.69,277.34Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[81] ? selectedColor : 'white'}
            />
            <path className="c" d="M303.56,231.8l-2.23,2.93-4.49,3.78-.52,0a35.46,35.46,0,0,1,6.66-6.69A2.82,2.82,0,0,1,303.56,231.8Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[82] ? selectedColor : 'white'}
            />
            <path className="c" d="M410.32,337.83a19.5,19.5,0,0,1,9.74,3.11A30.16,30.16,0,0,1,410.32,337.83Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[83] ? selectedColor : 'white'}
            />
            <path className="c" d="M295.32,239.84l-3.7,4.6-2.53,1.42A18,18,0,0,1,295.32,239.84Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[84] ? selectedColor : 'white'}
            />
            <path className="c" d="M483.5,340.62a13.66,13.66,0,0,1-7.54,4.6A23.29,23.29,0,0,1,483.5,340.62Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[85] ? selectedColor : 'white'}
            />
            <path className="c" d="M444.72,316.81c-2.53,1.78-5.41,1.63-8.28,1.52A30,30,0,0,1,444.72,316.81Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[86] ? selectedColor : 'white'}
            />
            <path className="c" d="M500.83,317.89a6.43,6.43,0,0,1,4.34-4A10.68,10.68,0,0,1,500.83,317.89Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[87] ? selectedColor : 'white'}
            />
            <path className="c" d="M460.47,340.21c1.63-1.93,3.86-2.26,6.19-2.31A16.36,16.36,0,0,1,460.47,340.21Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[88] ? selectedColor : 'white'}
            />
            <path className="c" d="M490.3,279.55c-.64,1.1-.88,2.5-2.32,3a6,6,0,0,1,1.48-3Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[89] ? selectedColor : 'white'}
            />
            <path className="c" d="M356.6,292.25c0,1.53,0,3.07-.05,4.61-.88-1.13-.73-2.47-.75-3.78.07-.28.13-.56.19-.85S356.41,291.92,356.6,292.25Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[90] ? selectedColor : 'white'}
            />
            <path className="c" d="M448.49,284.09a2.37,2.37,0,0,1,2.72-1.56A3.43,3.43,0,0,1,448.49,284.09Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[91] ? selectedColor : 'white'}
            />
            <path className="c" d="M356.6,292.25l-.61,0c0-2-.08-4-.13-6,7.51,0,15,.2,22.53-.08,3.65-.14,5,1.07,4.35,4.56-7.64,0-15.28,0-22.92,0C358.59,290.78,357,290.19,356.6,292.25Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[92] ? selectedColor : 'white'}
            />
            <path d="M115.21,436.14V85.45c29.41,0,58.26-.28,87.09.06,56.63.66,113.26,1.16,169.86,2.63a815.48,815.48,0,0,1,212.48,33.41c27.2,8.1,53.67,18.7,80.47,28.16,7.41,2.62,11.68,6.55,11.65,15.7q-.51,177.54-.34,355.1c0,1.33-.34,2.66-.84,6.32-7.34-6-13.66-11.24-20.1-16.35C609,473.56,554.41,455.72,497.05,447.82c-48.31-6.65-97.31-9.84-146.1-11.05-73.47-1.82-147-.58-220.54-.63Zm36.07-334.82V421.21c9.57,0,18.09-.11,26.61,0,84.33,1.33,168.73,1,253,4.6,63.49,2.71,125.84,14.72,183.88,42.59,16.34,7.85,31.75,17.62,48.34,26.94.5-5,1.32-9.5,1.33-14q.23-153.15.42-306.3c0-8.49-4.08-12-11.27-14.39-32.62-10.74-64.78-23.08-97.84-32.23-72.88-20.17-147.57-27.34-223.06-27.18C272.35,101.42,212.05,101.32,151.28,101.32ZM139.16,422.23V100.52l-14,.91v320.8Z" transform="translate(-115.21 -85.34)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={selectedStroke}
            />
        </svg>

    )
}

export default Flag7
