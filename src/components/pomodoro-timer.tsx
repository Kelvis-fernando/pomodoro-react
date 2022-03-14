import React from 'react';
import { useInterval } from '../hooks/use-interval';
import { Button } from './Button';
import { Timer } from './Timer';

interface Props {
  defaultPomodoroTimer: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = React.useState(props.defaultPomodoroTimer);

  useInterval(() => {
    setMainTime(mainTime - 1);
  }, 1000);

  return (
    <div className="pomodoro">
      <h2>You Are: Working</h2>
      <Timer mainTime={mainTime} />
      <Button text="Start" />
    </div>
  );
}
