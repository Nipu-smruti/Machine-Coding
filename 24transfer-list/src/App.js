import './App.css';
import { useState } from 'react';
import { data } from './data';

function App() {
  const [leftData, setLeftData] = useState(data);
  const [rightItems, setRightItems] = useState([]);

  const checkedList = (list, id, checked) => {
    return list.map((item) => {
      if (id === item.id) {
        return {
          ...item,
          checked: !checked
        }
      }
      return item;
    })
  }

  const handelClick = (id, checked, dir) => {
    if (dir === 'LEFT') {
      let copyList = [...leftData];
      copyList = checkedList(copyList, id, checked);
      setLeftData(copyList);
    } else {
      let copyList = [...rightItems];
      copyList = checkedList(copyList, id, checked);
      setRightItems(copyList);
    }
  };
  const resetItems = (list) => {
    return list.map((item) => {
      return {
        ...item,
        checked: false
      }
    })
  }

  const handelTransferBtn = (dir) => {
    if (dir === 'LEFT_TO_RIGHT') {
      if (leftData.length) {
        const copyList = [...leftData];
        const checkedList = copyList.filter((item) => item.checked);
        const unCheckList = copyList.filter((item) => !item.checked);
        setRightItems(resetItems([...rightItems, ...checkedList]));
        setLeftData(unCheckList);
      } else {

      }
    }
  }

  return (
    <div className="App">
      <h1>Transfer List</h1>
      <div className='container'>
        <div className='box'>
          {
            leftData.map(({ title, id, checked }) => (
              <div
                key={id}
                id={id}
                onClick={() => handelClick(id, checked, 'LEFT')}
                className={`item ${checked ? 'checked' : ''}`}
              >{title}</div>
            ))
          }
        </div>
        <div className='actions'>
          <button
            onClick={() => handelTransferBtn('LEFT_TO_RIGHT')}
          >Right</button>
          <button
            onClick={() => handelTransferBtn('RIGHT_TO_LEFT')}
          >Left</button>
        </div>
        <div className='box'>
          {
            rightItems.map(({ title, id, checked }) => (
              <div
                key={id}
                id={id}
                className='item'
              >{title}</div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default App;
