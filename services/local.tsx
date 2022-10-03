import { UserProfile } from '@auth0/nextjs-auth0';
import { User } from '@prisma/client';
import { ResponseType } from 'types/types';

export const addUser = (user: UserProfile) => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };
  const url = '/api/users';
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

export const getUserById = (slug) => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };
  const url = '/api/user/' + slug;
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
        success: false as const,
        error: error,
      };
    });
};

export const getUser = (email: string) => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };
  const url = '/api/users/' + email;
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
        success: false as const,
        error: error,
      };
    });
};

export const updateUser = (user: User, town: string, profileText: string) => {
  const defaultFeaders = {
    Accept: 'application/json',
    'content-Type': 'application/json;charset=UTF-8',
  };

  const url = '/api/users/';
  const options = {
    method: 'PATCH',
    headers: defaultFeaders,
    body: JSON.stringify({
      email: user.email,
      town: town,
      profileText: profileText,
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
        success: false as const,
        error: error,
      };
    });
};

export const listUsers = () => {
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
        success: false as const,
        error: error,
      };
    });
};

export const addTune = (tune, email, knowOrLearn) => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };
  const url = 'api/tunes/tune';
  const options = {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      tune: tune,
      email: email,
      knowOrLearn: knowOrLearn,
    }),
  };

  fetch(url, options)
    .then((response) => {
      if (response.status === 200) {
        response
          .json()
          .then((data) => console.log(data))
          .catch((error) => console.log(error));
      } else {
        console.log(response.status);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

export const getStaredTunes = () => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };
  const url = '/api/tunes/tune';
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
        success: false as const,
        error: error,
      };
    });
};

export const addNewRelation = (addingEmail, addedEmail) => {
  const defaultHeaders = {
    Accept: 'application/json',
    'Content-Type': 'application/json;charset=UTF-8',
  };

  const url = 'api/relations/relations';
  const options = {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      addingEmail: addingEmail,
      addedEmail: addedEmail,
    }),
  };

  fetch(url, options)
    .then((response) => {
      if (response.status === 200) {
        response
          .json()
          .then((data) => console.log(data))
          .catch((error) => console.log(error));
      } else {
        console.log(response.status);
      }
    })
    .catch((error) => {
      console.error(error);
    });
};

/* export const KnowTuneNames = (databaseUser) => {

} */
