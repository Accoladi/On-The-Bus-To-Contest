import React, { useState } from 'react'
import "./../styles/colorbook.css";

const Flag5 = ({ selectedColor, onPathClick, selectedStroke }) => {
    const [isClicked, setIsClicked] = useState(new Array(10).fill(false));

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
                     .b{stroke:${selectedStroke};stroke-miterlimit:10;stroke-width:3px;}
                    `
                    }

                </style>
            </defs>
            <path class="a" d="M225.35,101.78c60.78,0,121.08.1,181.38,0,75.49-.16,150.17,7,223.06,27.18,33.05,9.15,65.22,21.5,97.84,32.23,7.18,2.36,11.29,5.9,11.26,14.4q-.42,153.13-.41,306.29c0,4.47-.83,8.94-1.33,14-16.59-9.31-32-19.09-48.34-26.94C630.76,441,568.42,429,504.93,426.29c-84.23-3.59-168.63-3.27-253-4.6-8.52-.13-17.05,0-26.62,0Z" transform="translate(-189.29 -85.81)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[0] ? selectedColor : 'white'}
            />
            <path class="a" d="M213.23,422.69h-14V101.9l14-.92Z" transform="translate(-189.29 -85.81)"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[1] ? selectedColor : 'white'}
            />
            <polygon class="b" points="55.79 342.58 195.02 204.12 229.76 273.35 300.95 158.73 409.85 352.4 553.48 204.89 553.48 415.66 481.17 381.47 419.63 364.12 358.1 351.81 55.79 342.58"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[2] ? selectedColor : 'white'}
            />
            <circle class="b" cx="351.86" cy="97.13" r="50.9"
                onClick={handleClick}
                style={{ pointerEvents: 'all' }}
                fill={isClicked[3] ? selectedColor : 'white'}
            />
            <path d="M189.29,436.6V85.91c29.41,0,58.25-.27,87.09.06,56.62.66,113.26,1.16,169.86,2.63A815.41,815.41,0,0,1,658.71,122c27.21,8.11,53.67,18.7,80.48,28.16,7.41,2.62,11.68,6.55,11.65,15.7q-.51,177.54-.34,355.1c0,1.33-.34,2.66-.84,6.32-7.34-6-13.67-11.24-20.11-16.35C683.1,474,628.49,456.18,571.12,448.28c-48.3-6.65-97.31-9.84-146.09-11-73.47-1.82-147-.57-220.54-.63C200,436.59,195.54,436.6,189.29,436.6Zm36.06-334.82v319.9c9.57,0,18.1-.12,26.62,0,84.33,1.33,168.73,1,253,4.6C568.42,429,630.76,441,688.81,468.88c16.34,7.85,31.75,17.63,48.34,26.94.5-5,1.32-9.5,1.33-14q.21-153.15.41-306.29c0-8.5-4.08-12-11.26-14.4-32.62-10.73-64.79-23.08-97.84-32.23-72.89-20.17-147.57-27.34-223.06-27.18C346.43,101.88,286.13,101.78,225.35,101.78ZM213.23,422.69V101l-14,.92V422.69Z" transform="translate(-189.29 -85.81)"
                fill={selectedStroke}
            />
        </svg>
    )
}

export default Flag5
