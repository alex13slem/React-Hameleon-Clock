import css from './App.module.css';
import { useState, useEffect } from 'react';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
    const randomHex = getRandomInt(0, 360);
    setHexCounter(randomHex);
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
      <h1
        className={css.clock}
        style={
          run
            ? { backgroundColor: `hsl(${hexCounter} 100% 50%)` }
            : { backgroundColor: 'white' }
        }
      >
        {time}
      </h1>
      <button onClick={handleClick}>{run ? 'stop' : 'start'}</button>
    </div>
  );
}

export default App;
