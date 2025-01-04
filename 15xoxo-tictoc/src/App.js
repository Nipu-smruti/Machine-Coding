import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [matrix, setMatrix] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [won, setWon] = useState(null);
  const [result, setResult] = useState(true);

  const handelUserClick = (e) => {
    const pos = e.target.id;
    if (matrix[pos] || won) {
      return;
    } else {
      let copyMatrix = [...matrix];
      copyMatrix[pos] = isXTurn ? "X" : "O";
      setMatrix(copyMatrix);
      setIsXTurn((prevTurn) => !prevTurn);
    }
  };

  const decideWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      let [a, b, c] = lines[i];
      if (matrix[a] &&
        matrix[a] === matrix[b] &&
        matrix[a] === matrix[c]
      ) {
        setWon(matrix[a]);
        setResult(false)
      }
    }
  }

  useEffect(() => {
    decideWinner();
  }, [matrix]);

  const handelReset = () => {
    setMatrix(Array(9).fill(null));
    setIsXTurn(true);
    setWon(null);
  }

  return (
    <div className="App">
      <h1>TIC-TAC-TOE</h1>
      <div
        onClick={handelUserClick}
        className='board'>
        {
          matrix.map((item, index) => (
            <div
              id={index}
              key={index}
              className='card'>
              {item}
            </div>
          ))
        }
      </div>

      <div className='job-info'>
        <button onClick={handelReset}>Reset</button>
        <div>Next Player: {isXTurn ? "X" : 'O'}</div>
        {
          won && <div>Player {won}  Won The Game</div>
        }
      </div>
    </div>
  );
}

export default App;
