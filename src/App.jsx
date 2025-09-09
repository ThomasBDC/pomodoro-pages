
import { useState, useRef } from 'react';
import './App.css';

const WORK_MINUTES = 25;
const BREAK_MINUTES = 5;

function App() {
  const [minutes, setMinutes] = useState(WORK_MINUTES);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isWork, setIsWork] = useState(true);
  const timerRef = useRef(null);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev === 0) {
            if (minutes === 0) {
              clearInterval(timerRef.current);
              setIsWork((prevIsWork) => {
                const nextIsWork = !prevIsWork;
                setMinutes(nextIsWork ? WORK_MINUTES : BREAK_MINUTES);
                setSeconds(0);
                setIsRunning(false);
                return nextIsWork;
              });
              return 0;
            } else {
              setMinutes((m) => m - 1);
              return 59;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  const resetTimer = () => {
    stopTimer();
    setMinutes(isWork ? WORK_MINUTES : BREAK_MINUTES);
    setSeconds(0);
  };

  return (
    <div className="pomodoro-container">
      <h1>Pomodoro Timer</h1>
      <div className={`timer ${isWork ? 'work' : 'break'}`}> 
        <span>{String(minutes).padStart(2, '0')}</span>
        :
        <span>{String(seconds).padStart(2, '0')}</span>
      </div>
      <div className="controls">
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={stopTimer} disabled={!isRunning}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="mode-label">
        {isWork ? 'Work Session' : 'Break Session'}
      </div>
      <footer>
        <p>Modern Pomodoro App - React + Vite</p>
      </footer>
    </div>
  );
}

export default App;
