import { useNavigate } from 'react-router-dom';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Button from '../components/mui/Button';
import TextField from '../components/mui/TextField';
import { useAuth } from '../providers/auth';

import classes from './Login.module.scss';

const FormSchema = z.object({
  username: z.string().min(1, {
    message: 'ユーザーID必須です',
  }),
  password: z.string().min(1, {
    message: 'パスワードは必須です',
  }),
});

function Login() {
  const auth = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const result = await auth.signIn(data.username, data.password);
    if (result.success) {
      navigate('/');
    }
  };

  return (
    <main>
      <div className={classes.mainContainer}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <TextField
            label='ユーザーID'
            margin='normal'
            fullWidth
            autoComplete='username'
            error={Boolean(form.formState.errors.username)}
            helperText={form.formState.errors.username?.message}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...form.register('username')}
          />
          <TextField
            label='パスワード'
            type='password'
            margin='normal'
            fullWidth
            autoComplete='current-password'
            error={Boolean(form.formState.errors.password)}
            helperText={form.formState.errors.password?.message}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...form.register('password')}
          />
          <div className={classes.pt8} />
          <Button type='submit' buttonName='ログイン'>
            ログイン
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Login;
