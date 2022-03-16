import React, { useEffect, useState, useCallback } from 'react';
import { useInterval } from '../hooks/use-interval';
import { secondsToMinutes } from '../utils/seconds-to-minutes';
import { Button } from './Button';
import { Timer } from './Timer';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3');
const audioStartWorking = new Audio(bellStart);
const audioFinishWorking = new Audio(bellFinish);

interface Props {
  defaultPomodoroTimer: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

export function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.defaultPomodoroTimer);
  const [timeWorking, setTimeWorking] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cyclesQtdManager, setCyclesQtdManager] = useState(
    new Array(props.cycles - 1).fill(true),
  );
  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime(mainTime - 1);
      if (working) setFullWorkingTime(fullWorkingTime + 1);
    },
    timeWorking ? 1000 : null,
  );

  const configWork = useCallback(() => {
    setTimeWorking(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.defaultPomodoroTimer);
    audioStartWorking.play();
  }, [setTimeWorking, setWorking, setResting, setMainTime, audioStartWorking]);

  const configRest = useCallback(
    (long: boolean) => {
      setTimeWorking(true);
      setWorking(false);
      setResting(true);
      audioFinishWorking.play();

      if (long) {
        setMainTime(props.longRestTime);
      } else {
        setMainTime(props.shortRestTime);
      }
    },
    [setTimeWorking, setWorking, setResting, audioFinishWorking, setMainTime],
  );

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');

    if (mainTime > 0) return;

    if (working && cyclesQtdManager.length > 0) {
      configRest(true);
      cyclesQtdManager.pop();
    } else if (working && cyclesQtdManager.length <= 0) {
      configRest(true);
      setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
      setCompletedCycles(completedCycles + 1);
    }

    if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
    if (resting) configWork();
  }, [
    working,
    resting,
    mainTime,
    configRest,
    configWork,
    setCyclesQtdManager,
    setCompletedCycles,
    setNumberOfPomodoros,
    props.cycles,
    completedCycles,
  ]);

  return (
    <div className="pomodoro">
      <h2>Você esta: {working ? 'Trabalhando' : 'Descansando'}</h2>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Work" onClick={() => configWork()} />
        <Button
          text="Rest"
          onClick={() => {
            configRest(false);
          }}
        />
        <Button
          className={!working && !resting ? 'hidden' : ''}
          text={timeWorking ? 'Pause' : 'Play'}
          onClick={() => setTimeWorking(!timeWorking)}
        />
      </div>

      <div className="details">
        <p>Ciclos Concluidos: {completedCycles}</p>
        <p>Horas Trabalhadas: {secondsToMinutes(fullWorkingTime)}</p>
        <p>Numero de pomodoros: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}
