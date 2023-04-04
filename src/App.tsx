import clsx from 'clsx';

import { AddTimerForm, TimersList, TimersProvider } from '@/lib/timer';

function App() {
  return (
    <TimersProvider>
      <div
        className={clsx(
          'flex flex-col justify-center items-center',
          'h-screen text-center bg-nordlightgray'
        )}
      >
        <div className="w-80">
          <header className="py-2">countdown</header>

          <TimersList />
          <AddTimerForm />

          <footer className="text-xs text-gray-700">
            <p>
              Made by
              <a href="https://mateossh.me">mateossh</a>
            </p>
            <a href="https://github.com/mateossh/countdown">Source code</a>
          </footer>
        </div>
      </div>
    </TimersProvider>
  );
}

export default App;
