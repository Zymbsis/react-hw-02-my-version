import css from './Feedback.module.css';
// import { useState } from 'react';
const Feedback = ({ children, value }) => {
  return (
    <div className={css.optionsWrapper}>
      <span>
        {children}
        {value}
      </span>
    </div>
  );
};
export default Feedback;
