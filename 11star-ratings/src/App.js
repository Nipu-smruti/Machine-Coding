import { useState } from 'react';
import './App.css';

function App() {
  const [ratings, setratings] = useState(0);
  const [hover, SetHover] = useState(0);
  return (
    <div className="App">
      <h1>Star Ratings</h1>
      <div>
        {
          [1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              onClick={() => setratings(num)}
              onMouseOver={() => SetHover(num)}
              onMouseLeave={() => SetHover(ratings)}
            >
              <span className={
                `star 
                ${num <= ((ratings && hover) || hover) ?
                  'on' : 'off'}`
              }
              >&#9733;</span>
            </button>
          ))
        }
      </div>
    </div>
  );
}

export default App;
