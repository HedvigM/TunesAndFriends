import { UserProfile } from '@auth0/nextjs-auth0';

export const addUser = (user: UserProfile) => {
  console.log('nu kör vi addUser i local');

  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };
  const url = '/api/auth/users';
  const options = {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      name: user.name,
      email: user.email,
    }),
  };
  fetch(url, options)
    .then((response) => {
      console.log(response);
      if (response.status === 200) {
        response
          .json()
          .then((data) => console.log(data))
          .catch((error) => {
            console.error(error);
          });
      } else {
        console.error(response.status);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};
