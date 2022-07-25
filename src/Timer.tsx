import { useEffect } from 'react'
import { useForceUpdate } from './hooks'

// Returns tuple
// First element is human readable format
// Second element is string for <time> element with specific format
const countDateDiff = (date: string): [string, string] => {
  let diff = Date.parse(date) - Date.now();
  let humanReadable = '';
  let datetimeAttr = 'PT';

  diff = Math.abs(diff / 1000);
  const firstDiff = diff;

  const seconds = Math.floor(diff % 60);
  diff = diff / 60;
  const minutes = Math.floor(diff % 60);
  diff = diff / 60;
  const hours = Math.floor(diff % 24);
  const days = Math.floor(diff / 24);

  if (firstDiff >= 60 * 60 * 24) {
    humanReadable += `${days} days `;
    datetimeAttr += `${days}D`;
  }
  if (firstDiff >= 60 * 60) {
    humanReadable += `${hours} hours `;
    datetimeAttr += `${hours}H`;
  }
  if (firstDiff >= 60) {
    humanReadable += `${minutes} minutes `;
    datetimeAttr += `${minutes}M`;
  }

  humanReadable += `${seconds} seconds left`;
  datetimeAttr += `${seconds}S`;

  return [humanReadable, datetimeAttr];
}

interface TimerProps {
  title: string
  date: string
  onClick: Function
}

function Timer({ title, date, onClick }: TimerProps) {
  const forceUpdate = useForceUpdate();
  const [longFormat, shortFormat] = countDateDiff(date);

  useEffect(() => {
    const updateInterval = setInterval(() => { forceUpdate() }, 1000);

    return () => {
      clearInterval(updateInterval);
    }
  }, [])

  return (
    <li className="my-6">
      <div className="flex flex-row justify-between">
        <h3 className="text-left">{title}</h3>
        <button
          className="text-xs"
          onClick={() => {onClick()}}
        >
          X
        </button>
      </div>
      <time
        dateTime={shortFormat}
        className="block text-left text-testsize text-gray-500 -mt-0.5"
      >
        {longFormat}
      </time>
    </li>
  )
}

export default Timer
