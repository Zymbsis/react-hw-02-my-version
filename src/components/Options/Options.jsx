import css from './Options.module.css';
import { useState, useEffect } from 'react';
import Feedback from '../Feedback/Feedback';
import Notification from '../Notification/Notification';

const Options = () => {
  const rating = JSON.parse(localStorage.getItem('rating'));
  const initialRating = {
    good: 0,
    neutral: 0,
    bad: 0,
    total: 0,
    positive: 0,
  };

  const [clicks, setClicks] = useState(rating ? rating : initialRating);

  const updateRating = type => {
    setClicks(prevState => {
      if (type === 'Reset') {
        return initialRating;
      } else {
        const newClicks = {
          ...prevState,
          [type === 'Good' ? 'good' : type === 'Neutral' ? 'neutral' : 'bad']:
            prevState[type.toLowerCase()] + 1,
        };
        newClicks.total = newClicks.good + newClicks.neutral + newClicks.bad;
        newClicks.positive =
          Math.round(
            ((newClicks.good + newClicks.neutral) / newClicks.total) * 100
          ) + '%';
        return newClicks;
      }
    });
  };

  useEffect(() => {
    localStorage.setItem('rating', JSON.stringify(clicks));
  }, [clicks]);

  const handleClick = e => {
    updateRating(e.target.textContent);
  };

  return (
    <>
      <div className={css.buttonWrapper}>
        <button onClick={handleClick}>Good</button>
        <button onClick={handleClick}>Neutral</button>
        <button onClick={handleClick}>Bad</button>
        {clicks.total > 0 && <button onClick={handleClick}>Reset</button>}
      </div>
      {clicks.total ? <Feedback clicks={clicks} /> : <Notification />}
    </>
  );
};
export default Options;
