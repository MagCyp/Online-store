import { useEffect, useState } from 'react';

import { TimerItem } from '@hooks/timeout/types';

export const useTimeout = (date: string) => {
  const [timerDays, setTimerDays] = useState<string>('0');
  const [timerHours, setTimerHours] = useState<string>('0');
  const [timerMinutes, setTimerMinutes] = useState<string>('0');
  const [timerSeconds, setTimerSeconds] = useState<string>('0');

  const timerItems: TimerItem[] = [
    { date: timerDays.padStart(2, '0') },
    { date: timerHours.padStart(2, '0') },
    { date: timerMinutes.padStart(2, '0') },
    { date: timerSeconds.padStart(2, '0') },
  ];
  const timerInformation: string[] = ['Days', 'Hours', 'Minutes', 'Seconds'];

  useEffect(() => {
    let interval: any;

    const startTimer = () => {
      const countDownDate = new Date(date).getTime();

      interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        const days = Math.floor(distance / (24 * 60 * 60 * 1000));
        const hours = Math.floor(
          (distance % (24 * 60 * 60 * 1000)) / (1000 * 60 * 60),
        )
          .toString()
          .padStart(2, '0');
        const minutes = Math.floor((distance % (60 * 60 * 1000)) / (1000 * 60))
          .toString()
          .padStart(2, '0');
        const seconds = Math.floor((distance % (60 * 1000)) / 1000)
          .toString()
          .padStart(2, '0');

        if (distance < 0) {
          clearInterval(interval);
        } else {
          setTimerDays(days.toString());
          setTimerHours(hours.toString());
          setTimerMinutes(minutes.toString());
          setTimerSeconds(seconds.toString());
        }
      }, 1000);
    };
    startTimer();

    return () => clearInterval(interval);
  }, []);

  return {
    timerItems,
    timerInformation,
  };
};
