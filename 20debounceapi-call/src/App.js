// `https://api.frontendeval.com/fake/food/${input}`;
import { useEffect, useState } from 'react';
import './App.css';
import debounceQuery from './utils';

function App() {
  const [input, setInput] = useState('');
  const [list, setList] = useState([]);

  const handelInputChange = (e) => {
    setInput(e.target.value)
  }

  const fetchApiCalls = async () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
    const data = await debounceQuery(url);
    setList(data);
  };

  useEffect(() => {
    fetchApiCalls();
  }, [input]);

  return (
    <div className="App">
      <h1>Debounce API Call</h1>
      <input
        type='text'
        value={input}
        onChange={handelInputChange}
      />
      {
        input && <div className='product-list'>
          {
            list.map((item, idx) => (
              <div
                key={idx}
                className='item'
              >{item.strMeal}</div>
            ))
          }
        </div>
      }
    </div>
  );
}

export default App;
