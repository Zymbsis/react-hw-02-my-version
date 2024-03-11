import './App.css';
import { useState, useEffect } from 'react';
import Description from './Description/Description';
import Feedback from './Feedback/Feedback';
import Options from './Options/Options';
import Notification from './Notification/Notification';

function App() {
  const savedRating = JSON.parse(window.localStorage.getItem('saved-rating'));
  const initialState = { good: 0, neutral: 0, bad: 0 };
  const [clicks, setClicks] = useState(
    savedRating ? savedRating : initialState
  );

  const totalFeedback = clicks.good + clicks.neutral + clicks.bad;
  const positive =
    Math.round(((clicks.good + clicks.neutral) / totalFeedback) * 100) + '%';

  const updateFeedback = feedbackType => {
    if (feedbackType === 'Good') {
      setClicks({ ...clicks, good: clicks.good + 1 });
    } else if (feedbackType === 'Neutral') {
      setClicks({ ...clicks, neutral: clicks.neutral + 1 });
    } else if (feedbackType === 'Bad') {
      setClicks({ ...clicks, bad: clicks.bad + 1 });
    } else if (feedbackType === 'Reset') {
      setClicks(initialState);
    }
  };

  useEffect(() => {
    window.localStorage.setItem('saved-rating', JSON.stringify(clicks));
  }, [clicks]);

  return (
    <div className="container">
      <Description />
      <div className="button-wrapper">
        <Options handleClick={() => updateFeedback('Good')}>Good</Options>
        <Options handleClick={() => updateFeedback('Neutral')}>Neutral</Options>
        <Options handleClick={() => updateFeedback('Bad')}>Bad</Options>
        {totalFeedback > 0 && (
          <Options handleClick={() => updateFeedback('Reset')}>Reset</Options>
        )}
      </div>
      {totalFeedback ? (
        <div className="rating-wrapper">
          <Feedback value={clicks.good}>Good: </Feedback>
          <Feedback value={clicks.neutral}>Neutral: </Feedback>
          <Feedback value={clicks.bad}>Bad: </Feedback>
          <Feedback value={totalFeedback}>Total: </Feedback>
          <Feedback value={positive}>Positive: </Feedback>
        </div>
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
