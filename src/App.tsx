import React from 'react';
import { PomodoroTimer } from './components/pomodoro-timer';

function App() {
  return (
    <div className="App">
      <PomodoroTimer defaultPomodoroTimer={1500} />
    </div>
  );
}

export default App;
