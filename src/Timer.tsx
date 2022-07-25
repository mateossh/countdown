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
  
  const countDateDiff = (date: string): string => {
    let diff = Date.parse(date) - Date.now();
    let finalString = '';

    diff = Math.abs(diff / 1000);
    const firstDiff = diff;

    const seconds = Math.floor(diff % 60);
    diff = diff / 60;
    const minutes = Math.floor(diff % 60);
    diff = diff / 60;
    const hours = Math.floor(diff % 24);
    const days = Math.floor(diff / 24);

    if (firstDiff >= 60 * 60 * 24) finalString += `${days} days `;
    if (firstDiff >= 60 * 60) finalString += `${hours} hours `;
    if (firstDiff >= 60) finalString += `${minutes} minutes `;
    finalString += `${seconds} seconds`;

    return finalString;
  }

  return (
    <li>
      <h3>{title}</h3>
      <p>{countDateDiff(date)}</p>
    </li>
  )
}

export default Timer
