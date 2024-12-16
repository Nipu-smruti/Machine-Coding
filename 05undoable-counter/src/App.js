import { useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState(0);
  const [redoList, setRedoList] = useState([]);
  const [history, setHistory] = useState([]);

  const maintainHistory = (key, prev, curr) => {
    const obj = {
      action: key,
      prev,
      curr
    }
    const copyHist = [...history];
    copyHist.unshift(obj);
    setHistory(copyHist)
  }

  const handelClick = (key) => {
    const val = parseInt(key);
    maintainHistory(key, value, value + val);
    setValue((exsitingValue) => exsitingValue + val);
  }

  const handelUndo = () => {
    if (history.length) {
      const copyHistory = [...history];
      const firstItem = copyHistory.shift();
      setHistory(copyHistory);

      setValue(firstItem.prev);

      const copyRedoList = [...redoList];
      copyRedoList.push(firstItem);
      setRedoList(copyRedoList);
    }
  };

  const handelRedo = () => {
    if (redoList.length) {
      const copyRedoList = [...redoList];
      const poppedValue = copyRedoList.pop();
      setRedoList(copyRedoList);
      const { action, prev, curr } = poppedValue;
      setValue(curr);
      maintainHistory(action, prev, curr);
    }
  }

  return (
    <div className="App">
      <h1>Undoable Counter</h1>
      <div className='action-btn'>
        <button
          onClick={handelUndo}
        >Undo</button>
        <button
          onClick={handelRedo}
        >Redo</button>
      </div>
      <div className='user-Action'>
        {
          [-100, -10, -1].map((btn, i) => (
            <button
              key={i}
              onClick={() => handelClick(btn)}
            >{btn}</button>
          ))
        }
        <div>{value}</div>
        {
          ['+1', '+10', '+100'].map((btn, i) => (
            <button
              onClick={() => handelClick(btn)}
              key={i}
            >{btn}</button>
          ))
        }
      </div>
      <div className='history'>
        {
          history.map((item, i) => {
            return <div key={i} className='row'>
              <div>{item.action}</div>
              <div>{`[ ${item.prev} -> ${item.curr} ]`}</div>
            </div>
          })
        }
      </div>
    </div>
  );
}

export default App;
