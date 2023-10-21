import { useNavigate } from 'react-router-dom';

import classes from './Sample.module.scss';

function Sample() {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <p className={classes.title}>SamplePage</p>
      <button className={classes.button} type='button' onClick={() => navigate('/')}>
        Topへ
      </button>
    </div>
  );
}

export default Sample;
