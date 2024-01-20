import classes from './Day.module.scss';

type DayProps = {
  day: string;
};

function Day(props: DayProps) {
  const { day } = props;

  return (
    <div className={classes.container}>
      <p>{day}</p>
    </div>
  );
}

export default Day;
