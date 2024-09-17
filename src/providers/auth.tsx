import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';

import { Amplify, Auth } from 'aws-amplify';

Amplify.configure({
  region: import.meta.env.VITE_COGNITO_REGION,
  userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  userPoolWebClientId: import.meta.env.VITE_COGNITO_USER_POOL_WEB_CLIENT_ID,
});

type ContextType = {
  currentUser: () => Promise<string | null>;
  signIn: (username: string, password: string) => Promise<Result>;
  signOut: () => Promise<Result>;
};

type Result = {
  success: boolean;
  message: string;
};

const Context = createContext<ContextType>({} as ContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const currentUser = async () => {
    const user = await Auth.currentAuthenticatedUser()
      .then((res) => res.username as string)
      .catch(() => null);

    return user;
  };

  const signIn = async (username: string, password: string) => {
    const result = await Auth.signIn(username, password)
      .then(() => ({ success: true, message: '' }))
      .catch(() => ({
        success: false,
        message: '認証に失敗しました。',
      }));

    return result;
  };

  const signOut = async () => {
    const result = await Auth.signOut()
      .then(() => ({ success: true, message: '' }))
      .catch(() => ({
        success: false,
        message: 'ログアウトに失敗しました。',
      }));

    return result;
  };

  const value = useMemo(
    () => ({
      currentUser,
      signIn,
      signOut,
    }),
    []
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export const useAuth = () => useContext(Context);
