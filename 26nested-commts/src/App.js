import './App.css';
import { useState } from 'react';
import Comments from './Comments';
function App() {
  const [input, setInput] = useState('');
  const [comments, setComments] = useState([
    {
      id: 1,
      display: 'HII',
      children: [
        {
          id: 2,
          display: 'HELLO',
          children: [
            {
              id: 3,
              display: 'AWESOME',
              children: []
            }
          ]
        }
      ]
    },
    {
      id: 4,
      display: 'AMAZING',
      children: []
    }
  ]);

  const handelInputChange = (e) => {
    setInput(e.target.value);
  }

  const newComment = (text) => {
    return {
      id: new Date(),
      display: text,
      children: []
    }
  }

  const handelCommentBtn = () => {
    const copyComments = [...comments];
    if (input) {
      setComments([...copyComments, newComment(input)]);
      setInput('');
    }
  };

  const addComments = (comments, parentId, text) => {
    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      if (comment.id === parentId) {
        comment.children.unshift(newComment(text));
      }
    }

    for (let i = 0; i < comments.length; i++) {
      let comment = comments[i];
      addComments(comment.children, parentId, text);
    }
  }

  const addReply = (parentId, text) => {
    const copyComments = [...comments];
    addComments(copyComments, parentId, text);
  }

  return (
    <div className="App">
      <h1>Nested Comments</h1>
      {/* input box */}
      <div>
        <input
          type='text'
          value={input}
          placeholder='Your Comment'
          className='input-box'
          onChange={handelInputChange}
        />
      </div>
      {/* handel button */}
      <div>
        <button
          onClick={handelCommentBtn}
          className='handel-btn'
        >
          Comment
        </button>
      </div>
      {/* Nested Comments */}
      <div className='nested-comment'>
        {
          comments.map((item) => (
            <Comments
              key={item.id}
              comment={item}
              addReply={addReply}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
