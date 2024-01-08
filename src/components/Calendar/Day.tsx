import classes from './Day.module.scss';

import type { DayProps } from '../../types/props';

function Day(props: DayProps) {
  const { day } = props;

  return (
    <div className={classes.container}>
      <p>{day}</p>
    </div>
  );
}

export default Day;
