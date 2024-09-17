import { Auth } from 'aws-amplify';

// eslint-disable-next-line import/prefer-default-export
export const getApiToken = async () => {
  const user = await Auth.currentAuthenticatedUser();
  return user.signInUserSession.idToken.jwtToken;
};
