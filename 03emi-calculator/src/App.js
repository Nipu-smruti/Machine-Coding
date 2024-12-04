import { useState } from 'react';
import './App.css';

function App() {
  const [principal, setPrincipal] = useState(0);
  const [interest, setInterest] = useState(0);
  const [years, setYears] = useState(0);
  const [emi, setEmi] = useState(0);

  const handelInput = (e) => {
    const id = e.target.id;
    const value = parseInt(e.target.value);
    if (id === 'principal') {
      setPrincipal(value);
    } else if (id === 'interest') {
      setInterest(value);
    } else {
      setYears(value)
    }
  }

  const emiCalculation = () => {
    let r = interest;
    if (principal && r && years) {
      r = r / 12 / 100; //per month
      const calPow = Math.pow(1 + r, years * 12);
      const amount = Math.round(principal * (r * (calPow) / ((calPow) - 1)));
      setEmi(amount);
    }
  }

  return (
    <div className="loan-calc">
      <h1>Mortgage Calculator</h1>
      <div className='inputs'>
        <p>Principal</p>
        <input onChange={handelInput} type='number' id='principal' />
        <p>Interest</p>
        <input onChange={handelInput} type='number' id='interest' />
        <p>Years</p>
        <input onChange={handelInput} type='number' id='years' />
      </div>
      <div>
        <button onClick={emiCalculation}>Calculate</button>
      </div>
      <div className='emi'>Your EMI is ${emi}</div>
    </div>
  );
}

export default App;
