import { UserProfile } from "@auth0/nextjs-auth0";
import { User } from "@prisma/client";

/* add al items from profile page in the db */
export const addUser = (user: UserProfile) => {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };
  const url = "/api/users";
  const options = {
    method: "POST",
    headers: defaultHeaders,
    body: JSON.stringify({
      name: user.name,
      email: user.email,
      auth0UserId: user.sub,
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

export const getUserById = (slug: string) => {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };
  const url = "/api/user/" + slug;
  const options = {
    method: "GET",
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

export const getUser = (auth0UserId: string) => {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };

  const url = `/api/users/${auth0UserId}`;
  const options = {
    method: "GET",
    headers: defaultHeaders,
  };

  /* getMyCache...*/
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
    Accept: "application/json",
    "content-Type": "application/json;charset=UTF-8",
  };

  const url = "/api/users/";
  const options = {
    method: "PATCH",
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
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };
  const url = "/api/users";
  const options = {
    method: "GET",
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
export const listUsersWithTune = (tuneId: number) => {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };
  const url = `/api/users/?tuneId=${tuneId}`;
  const options = {
    method: "GET",
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

export const addTune = (tune: any, email: string, knowOrLearn: string) => {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };

  const url = "/api/tunes/tune";
  const options = {
    method: "POST",
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
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };
  const url = "/api/tunes/tune";
  const options = {
    method: "GET",
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

export const addNewRelation = (addingEmail: string, addedEmail: string) => {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  };

  const url = "/api/relations/relations";
  const options = {
    method: "POST",
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
