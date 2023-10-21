import { useNavigate } from 'react-router-dom';

import Sample from '../components/Sample';

import classes from './Top.module.scss';

function Top() {
  const navigate = useNavigate();
  return (
    <div className={classes.container}>
      <p className={classes.title}>TopPage</p>
      <button className={classes.button} type='button' onClick={() => navigate('sample')}>
        Sampleへ
      </button>
      <Sample />
    </div>
  );
}

export default Top;
