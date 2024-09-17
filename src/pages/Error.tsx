import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useAuth } from '../providers/auth';

import classes from './Error.module.scss';

function Error() {
  const auth = useAuth();

  /**
   * ログイン情報を削除する
   */
  useEffect(() => {
    auth.signOut();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.container}>
      <p className={classes.title}>Error</p>
      <Link to='/login'>Go back to Top</Link>
    </div>
  );
}

export default Error;
