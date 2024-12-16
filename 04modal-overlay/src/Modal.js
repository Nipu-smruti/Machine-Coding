// ❌

import React from 'react'

const Modal = ({ handelAcceptOffer, handelClose }) => {
    return (
        <div className='modal'>
            <div className='modal-content'>
                <button
                    className='close-btn'
                    onClick={handelClose}
                >
                    ❌
                </button>
                <div className='content'>
                    Click The Button Below to
                    Accept Our Amazing Offer!

                </div>
                <button
                    className='accept-btn'
                    onClick={handelAcceptOffer}
                >
                    Accept Offer
                </button>
            </div>
        </div>
    )
}

export default Modal