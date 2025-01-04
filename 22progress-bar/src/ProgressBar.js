import React from 'react';

const ProgressBar = ({ progress, color }) => {
    const barStyle = {
        width: `${progress}%`,
        height: 30,
        borderRadius: 20,
        backgroundColor: color || 'lightgray'
    }
    return (
        <div className='container'>
            <div className='progress-bar'>
                <div
                    style={barStyle}
                >
                    {`${progress}%`}
                </div>
            </div>
        </div>
    )
}
export default ProgressBar;