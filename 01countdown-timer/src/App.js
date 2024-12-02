import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [isStart, setIsStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [timerId, setTimerId] = useState(0);

  const handelStart = () => {
    if (hours < 0 || minutes < 0 || seconds <= 0) {
      alert('Invalid Input');
      return;
    } else {
      setIsStart(true);
    }
  }

  const handelPause = () => {
    setIsPaused(true);
    clearInterval(timerId);
  }

  const handelResume = () => {
    setIsPaused(false);
    runTimer(seconds, minutes, hours)
  }

  const handelReset = () => {
    setIsStart(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  }

  const handelInput = (e) => {
    const value = parseInt(e.target.value);
    const id = e.target.id;
    if (id === 'hours') {
      setHours(value);
    } else if (id === 'minutes') {
      setMinutes(value);
    } else {
      setSeconds(value);
    }
  }

  console.log(hours, minutes, seconds);

  const runTimer = (sec, min, hr, tid) => {
    if (sec > 0) {
      setSeconds((s) => s - 1)
    } else if (sec === 0 && min > 0) {
      setMinutes((m) => m - 1)
      setSeconds(59);
    } else if (min === 0 && hr > 0) {
      setHours((h) => h - 1)
      setMinutes(59);
      setSeconds(59);
    }
    if (sec === 0 && min === 0 && hours === 0) {
      alert('Timer Finished');
      handelReset();
      clearInterval(tid);
    }
    return
  }

  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hours, tid);
      }, 1000);
      setTimerId(tid)
    }
    return () => {
      clearInterval(tid);
    }
  }, [isStart, hours, minutes, seconds]);

  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      {
        !isStart && (<div className='input-container'>
          <div className='input-box'>
            <input onChange={handelInput} id='hours' placeholder='HH' />
            <input onChange={handelInput} id='minutes' placeholder='MM' />
            <input onChange={handelInput} id='seconds' placeholder='SS' />
          </div>
          <button
            className='timer-btn'
            onClick={handelStart}
          >
            Start
          </button>
        </div>
        )
      }
      {
        isStart && (<div className='show-container'>
          <div className='timer-box'>
            <div>{hours < 10 ? `0${hours}` : hours}</div>
            <span>:</span>
            <div>{minutes < 10 ? `0${minutes}` : minutes}</div>
            <span>:</span>
            <div>{seconds < 10 ? `0${seconds}` : seconds}</div>
          </div>
          <div className='action-btn'>
            {
              !isPaused &&
              <button onClick={handelPause} className='timer-btn'>Pause</button>
            }
            {
              isPaused &&
              <button onClick={handelResume} className='timer-btn'>Play</button>
            }
            <button onClick={handelReset} className='timer-btn'>Reset</button>
          </div>
        </div>
        )
      }
    </div>
  );
}

export default App;
