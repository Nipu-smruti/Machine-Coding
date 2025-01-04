import { useEffect, useState } from 'react';
import './App.css';
import ProgressBar from './ProgressBar';

function App() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((p) => p + 1);
      }
    }, 100);
    return () => {
      clearInterval(timer);
    }
  }, [progress])

  return (
    <div className="App">
      <ProgressBar
        progress={progress}
        color='red'
      />
      <ProgressBar
        progress={progress}
        color='yellow'
      />
      <ProgressBar
        progress={progress}
        color='lightgreen'
      />
      <ProgressBar
        progress={progress}
        color='lightblue'
      />
    </div>
  );
}

export default App;
