import './App.css';
import { useEffect, useState } from 'react';
// '⬆','⬇'
function App() {
  const arr = ['usd', 'eru', 'gbp', 'cny', 'jpy'];
  const [currency, setCurrency] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState('usd');
  const [convertedCurr, setConvertedCurr] = useState(0);
  const [diff, setDiff] = useState(0);
  const [isUp, setIsUp] = useState(true);

  const handelInput = (e) => {
    const val = e.target.value;
    setCurrency(val)
  }
  const handelCurrency = (e) => {
    const type = e.target.value;
    setSelectedCurrency(type);
  }
  const fetchCurrencyInfo = async () => {
    try {
      const url = `https://api.frontendeval.com/fake/crypto/${selectedCurrency}`;
      const result = await fetch(url);
      const data = await result.json();
      const val = data.value;
      const showCurr = currency * val;
      setConvertedCurr(showCurr.toFixed(2));
      const prevVal = window.sessionStorage.getItem('prevVal');
      const diff = showCurr.toFixed(2) - prevVal;
      diff < 0 ? setIsUp(false) : setIsUp(true);
      setDiff(diff.toFixed(2));
      window.sessionStorage.setItem('prevVal', showCurr.toFixed(2));
    } catch (err) {
      console.log('ERROR: ', err);
    }
  }

  console.log(convertedCurr);


  useEffect(() => {
    let time;
    time = setInterval(() => {
      fetchCurrencyInfo();
    }, 3000);
    return () => {
      clearInterval(time);
    }
  }, [currency, selectedCurrency])

  return (
    <div className="App">
      <h1>Crypto Convertor</h1>
      <div className='wrapper'>
        <input
          value={currency}
          type='number'
          onChange={handelInput}
        />
        <select
          value={selectedCurrency}
          onChange={handelCurrency}
        >
          {
            arr.map((curr, i) => (
              <option
                key={i}
                value={curr}
              >{curr.toUpperCase()}</option>
            ))
          }
        </select>
      </div>
      <div className='currency-info'>
        <div>{convertedCurr}</div>
        <div>WUC</div>
        <div className={
          isUp ? 'green' : 'red'
        }>
          <span>{isUp ? '⬆' : '⬇'}</span>
          <span>{diff}</span>
        </div>
      </div>
    </div>
  );
}

export default App;
