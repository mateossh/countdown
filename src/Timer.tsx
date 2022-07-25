import { useEffect } from 'react'
import { Timer as ITimer } from './types'
import { useForceUpdate } from './hooks'

function Timer({ title, date }: ITimer) {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const updateInterval = setInterval(() => { forceUpdate() }, 1000);

    return () => {
      clearInterval(updateInterval);
    }
  }, [])
  
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

    if (firstDiff >= 60 * 60 * 24) humanReadable += `${days} days `;
    if (firstDiff >= 60 * 60) humanReadable += `${hours} hours `;
    if (firstDiff >= 60) humanReadable += `${minutes} minutes `;
    humanReadable += `${seconds} seconds left`;


    if (firstDiff >= 60 * 60 * 24) datetimeAttr += `${days}D`;
    if (firstDiff >= 60 * 60) datetimeAttr += `${hours}H`;
    if (firstDiff >= 60) datetimeAttr += `${minutes}M`;
    datetimeAttr += `${seconds}S`;

    console.log('countDateDiff', humanReadable, datetimeAttr);

    return [humanReadable, datetimeAttr];
  }

  const [longFormat, shortFormat] = countDateDiff(date);

  return (
    <li className="my-4">
      <h3 className="text-left">{title}</h3>
      <time
        dateTime={shortFormat}
        className="text-gray-800"
      >
        {longFormat}
      </time>
    </li>
  )
}

export default Timer
