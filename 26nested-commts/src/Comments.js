import React, { useRef, useState } from 'react'

const Comments = ({ comment, addReply }) => {
    const [showReplyBox, setShowReplyBox] = useState(false);
    const [replyText, setReplyText] = useState('');
    const inputRef = useRef(null);

    const handelReplyBtn = () => {
        setShowReplyBox(true);
        setTimeout(() => {
            inputRef.current.focus();
        }, 1);
    };

    const handelCancelBtn = () => {
        setShowReplyBox(false);
        setReplyText('');
    };

    const handelReplySave = (commentId) => {
        addReply(commentId, replyText);
        setShowReplyBox(false);
        setReplyText('');
    }

    const handelKeyDown = (e, commentId) => {
        if (e.key === 'Enter') {
            handelReplySave(commentId);
        } else if (e.key === 'Escape') {
            handelCancelBtn();
        }
    };

    return (
        <li key={comment.id} className='comment-line'>
            {comment.display}
            {
                !showReplyBox &&
                <button
                    className='btn'
                    onClick={handelReplyBtn}
                >
                    reply
                </button>
            }
            {
                showReplyBox ? (
                    <>
                        <br />
                        <input
                            type='text'
                            ref={inputRef}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => handelKeyDown(e, comment.id)}
                        />
                        <br />
                        <button className='btn'>Save</button>
                        <button
                            className='btn'
                            onClick={handelCancelBtn}
                        >
                            Cancel
                        </button>
                    </>
                ) : null
            }
            {
                comment.children.length ? (
                    <ul>
                        {
                            comment.children.map((item) => (
                                <Comments
                                    key={item.id}
                                    comment={item}
                                    addReply={addReply}
                                />
                            ))
                        }
                    </ul>
                ) : null
            }
        </li>
    )
}

export default Comments