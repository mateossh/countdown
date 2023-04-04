import { useEffect } from 'react';

import { Timer, TimerFields, useTimers } from '@/lib/timer';

export function TimersList() {
  const { timers, dispatch } = useTimers();

  useEffect(() => {
    console.log('TimersList, timers', timers);
  }, [timers]);

  return (
    <ul className="my-2">
      {timers?.map(({ title, date }: TimerFields, id: number) => (
        <Timer
          key={id}
          title={title}
          date={date}
          onClick={() => {
            dispatch({ type: 'remove', id });
          }}
        />
      ))}

      {timers?.length === 0 && <li>No timers created :(</li>}
    </ul>
  );
}
