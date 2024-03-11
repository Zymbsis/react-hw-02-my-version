import css from './Options.module.css';

const Options = ({ children, handleClick }) => {
  return (
    <div className={css.buttonWrapper}>
      <button onClick={handleClick}>{children}</button>
    </div>
  );
};
export default Options;
