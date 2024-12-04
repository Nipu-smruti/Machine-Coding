// ➤
import { useState, useEffect } from 'react';
import './App.css';
import React from 'react'

const FAQitem = ({ faq, index }) => {
    const [isShow, setIsShow] = useState(false);

    const handelClick = () => {
        setIsShow((isShow) => !isShow);
    }

    useEffect(() => {
        if (index === 0) {
            setIsShow(true)
        }
    }, [])
    return (
        <div className='faq-box'>
            <div className='quen'
                onClick={handelClick}
            >
                <button className={isShow ? 'arrow' : ''}>➤</button>
                <div>{faq.question}</div>
            </div>
            {isShow &&
                <div className='ans'>{faq.answer}</div>}
        </div>

    )
}

export default FAQitem