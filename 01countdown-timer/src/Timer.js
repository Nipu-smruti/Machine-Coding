import React from 'react'

const Timer = (props) => {
    const {
        hours,
        minutes,
        seconds,
        isPaused,
        handelPause,
        handelResume,
        handelReset
    } = props
    return (
        <div><div className='show-container'>
            <div className='timer-box'>
                <div>{hours < 10 ? `0${hours}` : hours}</div>
                <span>:</span>
                <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
                <span>:</span>
                <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
            </div>
            <div className='action-btn'>
                {
                    !isPaused &&
                    <button
                        className='timer-btn'
                        onClick={handelPause}>Pause</button>
                }
                {
                    isPaused &&
                    <button
                        className='timer-btn'
                        onClick={handelResume}>Play</button>
                }

                <button
                    className='timer-btn'
                    onClick={handelReset}>Reset</button>
            </div>
        </div></div>
    )
}

export default Timer