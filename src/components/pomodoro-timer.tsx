import React, { useEffect } from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './Button';
import { Timer } from './Timer';

interface Props {
  defaultPomodoroTimer: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTimer);
  const [timeWorking, setTimeWorking] = React.useState(false);
  const [working, setWorking] = React.useState(false);

  useEffect(() => {
    if (working) document.body.classList.add('working');
  }, [working]);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
    },
    timeWorking ? 1000 : null,
  );

  const configWork = () => {
    setTimeWorking(true);
    setWorking(true);
  };

  return (
    <div className="pomodoro">
      <h2>You Are: Working</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Work" onClick={() => configWork()} />
        <Button text="Start" />
        <Button
          text={timeWorking ? 'Pause' : 'Play'}
          onClick={() => setTimeWorking(!timeWorking)}
        />
      </div>

      <div className="details">
        <p>Meus detalhes: suahusahs</p>
      </div>
    </div>
  );
}
