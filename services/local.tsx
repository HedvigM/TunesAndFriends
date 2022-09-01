import { UserProfile } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';
import user from 'pages/api/auth/users/[email]';
import { ResponseType } from 'types/types';

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

export const getUser = (email: string): Promise<ResponseType<User>> => {
  console.log('nu kör vi getUser i local');

  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };
  const url = '/api/auth/users/' + email;
  const options = {
    method: 'GET',
    headers: defaultHeaders,
  };
  return fetch(url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((response) => {
      return {
        success: true as const,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        success: false,
        error: error,
      };
    });
};

/* export const updateUser = (): Promise<ResponseType<User[]>> => {
  const defaultFeaders = {
    Accept: 'application/json',
    'content-Type': 'application/json;charset=UTF-8',
  };

  const url = '/api/auth/users/';
  const options = {
    method: 'PATCH',
    headers: defaultFeaders,
    body: JSON.stringify({
      email: user.email,
      town: user.town,
      profileText: user.profileText,
    }),
  };

  return fetch(url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((response) => {
      return {
        success: true as const,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        success: false,
        error: error,
      };
    });
}; */

export const listUsers = (): Promise<ResponseType<User[]>> => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };
  const url = '/api/users';
  const options = {
    method: 'GET',
    headers: defaultHeaders,
  };
  return fetch(url, options)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((response) => {
      return {
        success: true as const,
        data: response.data,
      };
    })
    .catch((error) => {
      return {
        success: false,
        error: error,
      };
    });
};
