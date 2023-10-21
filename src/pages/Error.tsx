import { Link } from 'react-router-dom';

import classes from './Error.module.scss';

function Error() {
  return (
    <div className={classes.container}>
      <p className={classes.title}>Error</p>
      <Link to='/'>Go back to Top</Link>
    </div>
  );
}

export default Error;
