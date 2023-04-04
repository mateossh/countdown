import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { TimerFields } from '@/lib/timer';

type Action =
  | { type: 'create'; title: string; date: string }
  | { type: 'remove'; id: number };

type ContextState = {
  timers: TimerFields[];
  dispatch: React.Dispatch<Action>;
} | null;

const reducer = (timers: TimerFields[], action: Action) => {
  switch (action.type) {
    case 'create': {
      const { title, date } = action;

      return [...timers, { title, date }];
    }
    case 'remove': {
      return timers.filter((_, index) => index !== action.id);
    }
    default: {
      throw Error('Unknown action');
    }
  }
};

export const TimersContext = createContext<ContextState>(null);

export const TimersProvider = ({ children }: PropsWithChildren) => {
  const savedTimers = () => {
    const timers = localStorage.getItem('timers');

    if (timers) {
      return JSON.parse(timers) as TimerFields[];
    }
    return [];
  };

  const [timers, dispatch] = useReducer(reducer, [], savedTimers);

  useEffect(() => {
    localStorage.setItem('timers', JSON.stringify(timers));
  }, [timers]);

  const value = { timers, dispatch };

  return (
    <TimersContext.Provider value={value}>{children}</TimersContext.Provider>
  );
};

export const useTimers = () => {
  const context = useContext(TimersContext);

  if (!context) {
    throw new Error('TimersContext is not defined');
  }

  return context;
};
