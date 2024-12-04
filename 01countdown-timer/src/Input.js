import React from 'react'

const Input = ({ handelInput, handelStart }) => {
    return (
        <div>
            <div className='input-container'>
                <div className='input-box'>
                    <input onChange={handelInput} id='hours' placeholder='HH' />
                    <input onChange={handelInput} id='minutes' placeholder='MM' />
                    <input onChange={handelInput} id='seconds' placeholder='SS' />
                </div>
                <button
                    onClick={handelStart}
                    className='timer-btn'>
                    Start
                </button>
            </div>
        </div>
    )
}

export default Input