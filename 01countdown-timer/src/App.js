import { useEffect, useState } from 'react';
import './App.css';
import Input from './Input';
import Timer from './Timer';

function App() {
  const [isStart, setisStart] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timerId, setTimerId] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handelStart = () => {
    if (hours < 0 || minutes < 0 || seconds <= 0) {
      alert('invalid Input');
      return
    } else {
      setisStart(true);
    }
  }
  const handelReset = () => {
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    setisStart(false);
    clearInterval(timerId);
  }


  const handelPause = () => {
    setIsPaused(true);
    clearInterval(timerId);
  }

  const handelResume = () => {
    setIsPaused(false);
    runTimer(seconds, minutes, hours)
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
      setMinutes((m) => m - 1);
      setSeconds(59);
    } else if (min === 0) {
      setHours((h) => h - 1);
      setMinutes(59);
      setSeconds(59);
    }
    if (hours === 0 && minutes === 0 && seconds === 0) {
      handelReset();
      clearInterval(tid);
      alert('Timer Finished');
    }
    return
  }

  useEffect(() => {
    let tid;
    if (isStart) {
      tid = setInterval(() => {
        runTimer(seconds, minutes, hours, tid)
      }, 1000)
      setTimerId(tid);
    }
    return () => {
      clearInterval(tid);
    }
  }, [isStart, hours, minutes, seconds])


  return (
    <div className="App">
      <h1>Countdown Timer</h1>
      {
        !isStart &&
        <Input
          handelInput={handelInput}
          handelStart={handelStart}
        />
      }
      {
        isStart &&
        <Timer
          hours={hours}
          minutes={minutes}
          seconds={seconds}
          isPaused={isPaused}
          handelPause={handelPause}
          handelResume={handelResume}
          handelReset={handelReset}
        />
      }
    </div>
  );
}

export default App;
