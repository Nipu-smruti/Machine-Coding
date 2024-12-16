import { useState } from 'react';
import './App.css';

function App() {
  const Arr = ['1', "2", '3', '4', '5', '6', '7', '8', '9',
    '0', '+', '-', '*', '/', '(', ')', '.', '=', 'C'];
  const [value, setValue] = useState('');

  const handelClick = (e) => {
    const id = e.target.id;
    if (id === 'C') {
      setValue('');
    } else if (id === '=') {
      // produce a result
      handelSubmit();
    } else {
      setValue((val) => val + id);
    }
  }

  const handelInputChange = (e) => {
    setValue(e.target.value);
  }

  const handelSubmit = (e) => {
    e?.preventDefault();
    try {
      const ans = eval(value);
      setValue(ans)
    } catch (err) {
      alert('Invalid Input')
    }
  }

  return (
    <div className="App">
      <h1>Calculator</h1>
      <form onSubmit={handelSubmit}>
        <input
          type='text'
          value={value}
          onChange={handelInputChange}
        />
      </form>
      <div className='container'>
        {
          Arr.map((item) => {
            return <button
              className='cell'
              key={item}
              id={item}
              onClick={handelClick}
            >{item}</button>
          })
        }
      </div>
    </div>
  );
}

export default App;
