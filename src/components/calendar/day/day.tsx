import classes from './day.module.scss';

type DayProps = {
  day: string;
};

export default function Day(props: DayProps) {
  const { day } = props;

  return (
    <div className={classes.container}>
      <p>{day}</p>
    </div>
  );
}
