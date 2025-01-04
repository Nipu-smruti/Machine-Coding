import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [twoDMatrix, setTwoDMatrix] = useState([]);
  const [start, setStart] = useState([]);
  const [end, setEnd] = useState([]);

  const prepareTwoDMatrix = () => {
    const matrix = [];
    for (let i = 0; i <= 9; i++) {
      for (let j = 0; j <= 9; j++) {
        const obj = {
          pos: [i, j],
          isColor: false
        }
        matrix.push(obj);
      }
    }
    setTwoDMatrix(matrix);
  };

  const handelOnDrag = (e, pos) => {
    setStart(pos)
    prepareTwoDMatrix();
  }

  const handelOnDragOver = (e, pos) => {
    setEnd(pos);
  }

  const fillColor = (startPos, endPos) => {
    const [startRow, startCol] = startPos;
    const [endRow, endCol] = endPos;
    const selectedGrid = [];
    for (let i = startRow; i <= endRow; i++) {
      for (let j = startCol; j <= endCol; j++) {
        selectedGrid.push([i, j].join(''));
      }
    }
    let copyMatrix = [...twoDMatrix];
    copyMatrix = copyMatrix.map((item) => {
      const { pos } = item;
      const stringPos = pos.join('');
      if (selectedGrid.includes(stringPos)) {
        item.isColor = true;
      }
      return item;
    });
    setTwoDMatrix(copyMatrix);
  }

  useEffect(() => {
    if (start.length > 1 && end.length > 1) {
      fillColor(start, end);
    }
  }, [start, end])

  useEffect(() => {
    prepareTwoDMatrix();
  }, [])

  return (
    <div className="App">
      <h1>Selectable Grid</h1>
      <div className='grid'>
        <div className='board'>
          {
            twoDMatrix?.map((item, index) => (
              <div
                key={index}
                draggable
                onDrag={(e) => handelOnDrag(e, item.pos)}
                onDragOver={(e) => handelOnDragOver(e, item.pos)}
                className={
                  `cell ${item.isColor && 'selected-cell'}`
                }
              >{item.pos}</div>
            ))
          }
        </div>
      </div>
    </div >
  );
}

export default App;
