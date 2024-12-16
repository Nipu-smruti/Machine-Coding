import { useEffect, useState } from 'react';
import './App.css';

const getNums = () => {
  let list = [];
  for (let i = 1; i <= 8; i++) {
    list.push(i)
    list.push(i);
  }
  return list;
}

function App() {
  const [stage, setStage] = useState('init');
  const [nums, setNums] = useState(getNums());
  const [opened, setOpened] = useState([]);
  const [solvedList, setSolvedList] = useState([]);

  const randomNums = () => {
    const copyNums = [...nums];
    return copyNums.sort(() => Math.random() - 0.5);
  }

  const handelStart = () => {
    setStage('start');
    setNums(randomNums());
    setSolvedList([]);
  }

  const handelClick = (num, index) => {
    if (opened.length === 2)
      return;
    setOpened((prev) => [...prev, index]);
  }

  const getClassName = (num, index) => {
    if (solvedList.includes(num)) {
      return 'remove';
    } else if (opened.includes(index)) {
      return 'show';
    } else {
      return 'hide';
    }
  }

  useEffect(() => {
    if (opened.length === 2) {
      setTimeout(() => {
        const idx1 = opened[0];
        const idx2 = opened[1];

        if (nums[idx1] === nums[idx2]) {
          setSolvedList((prev) => [...prev, nums[idx1]])
        }
        setOpened([]);
      }, 1000)
    }
  }, [opened]);

  useEffect(() => {
    if (solvedList.length === 8) {
      setStage('win');
    }
  }, [solvedList])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      {
        stage === 'init' &&
        <button
          onClick={handelStart}
        >Play Game</button>
      }
      {
        stage === 'start' &&
        <div className='game'>
          <div className='cards'>
            {
              nums.map((num, i) => (
                <div
                  key={i}
                  className={`card ${getClassName(num, i)}`}
                  onClick={() => handelClick(num, i)}
                >{num}</div>
              ))
            }
          </div>
        </div>
      }
      {
        stage === 'win' &&
        <div>
          <h1>You Won The Game</h1>
          <button
            onClick={handelStart}
          >Play Again</button>
        </div>
      }
    </div>
  );
}

export default App;
