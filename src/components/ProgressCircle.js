import React from "react";
import "../progress.css";


const ProgressCircle = ({ percentage }) => {
    const progressStyle = {
      background: `conic-gradient(
        green ${percentage * 3.6}deg,
        #ff0000 ${percentage * 3.6}deg 360deg
        )`,
    };

    return (
        <div >
        <div className="absolute top-2 right-2 bg-black/45 h-10 w-10 rounded-full text-white text-xs z-10 flex items-center justify-center">
            {percentage}%
        </div>
        <div className="absolute top-2 right-2">
            <div className="radial-progress" style={progressStyle}></div>
        </div>
        </div>
    );
};

export default ProgressCircle;
