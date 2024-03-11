import css from './Feedback.module.css';

const Feedback = ({ clicks }) => {
  return (
    <ul className={css.ratingWrapper}>
      {Object.entries(clicks).map((item, index) => {
        return (
          <li key={index}>
            <span>{`${item[0]}: ${item[1]}`}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default Feedback;
