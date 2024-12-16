import { useEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const emptyArr = ['', '', '', ''];
  const refs = [useRef(), useRef(), useRef(), useRef()];
  const [inputs, setInputs] = useState(emptyArr);
  const [missing, setMissing] = useState(emptyArr);
  const CODE = '1234';

  const handelSubmit = () => {
    const missed = inputs.map((item, i) => {
      if (item === '')
        return i;
    }).filter((item, i) => (item || item === 0));
    setMissing(missed);

    if(missed.length){
      return;
    }

    const userInput = inputs.join('');
    const isMatching = userInput === CODE;
    const msg = isMatching ? 'Code Is Valid' : 'Code is Not Valid';
    alert(msg);
  }

  useEffect(() => {
    refs[0].current.focus();
  }, []);

  const handelInputChange = (e, index) => {
    const val = e.target.value;
    if (!Number(val))
      return;

    if (index < inputs.length - 1) {
      refs[index + 1].current.focus();
    }
    const copyInputs = [...inputs];
    copyInputs[index] = val;
    setInputs(copyInputs);
  }

  const handelOnKeyDown = (e, index) => {
    if (e.keyCode === 8) {
      const copyInputs = [...inputs];
      copyInputs[index] = '';
      setInputs(copyInputs);
      if (index > 0) {
        refs[index - 1].current.focus();
      }
    }
  };

  const handelPaste = (e) => {
    const data = e.clipboardData.getData('text');
    if (!Number(data) || data.length !== inputs.length)
      return;
    const pasteData = data.split('');
    setInputs(pasteData);
    refs[inputs.length - 1].current.focus();
  }

  return (
    <div className="App">
      <h1>Two-Factor Input Code</h1>
      <div>
        {
          emptyArr.map((item, i) => {
            return <input
              type='text'
              value={inputs[i]}
              key={i}
              ref={refs[i]}
              maxLength='1'
              onPaste={handelPaste}
              onChange={(e) => handelInputChange(e, i)}
              onKeyDown={(e) => handelOnKeyDown(e, i)}
              className={missing.includes(i) ? 'error' : ''}
            />
          })
        }
      </div>
      <button
        onClick={handelSubmit}
      >Submit</button>
    </div>
  );
}

export default App;
