import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const timeInit = '00:00:00';
  const [time, setTime] = useState(timeInit);
  const [intervalId, setIntervalId] = useState(null);
  const [run, setRun] = useState(false);
  const [hexCounter, setHexCounter] = useState(0);

  function clockUpdate() {
    const time = new Date();
    const formatter = new Intl.DateTimeFormat('ru', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    });
    const formatTime = formatter.format(time);
    setTime(formatTime);

    if (hexCounter > 360) setHexCounter(0);
    setHexCounter((prev) => prev + 1);
  }

  function start() {
    clockUpdate();
    const intervalId = setInterval(clockUpdate, 1000);
    setIntervalId(intervalId);
  }

  function end() {
    document.body.style = null;
    setTime(timeInit);
    clearInterval(intervalId);
  }

  function handleClick() {
    setRun(!run);

    !run ? start() : end();
  }

  useEffect(() => {
    if (run) document.body.style.background = `hsl(${hexCounter} 50% 50%)`;
  }, [run, hexCounter]);

  return (
    <div>
      <h1>{time}</h1>
      <button onClick={handleClick}>{run ? 'stop' : 'start'}</button>
    </div>
  );
}

export default App;
