import { UserProfile } from "@auth0/nextjs-auth0";
import { User } from "@prisma/client";
import { ResponseType, UserWithEverything } from "types/types";
import { getMyCache } from "./functions";

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
      name: user.given_name,
      lastName: user.family_name,
      email: user.email,
      auth0UserId: user.sub,
      profilePicture: user.picture,
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

export const getUser = (
  auth0UserId: string
): Promise<ResponseType<UserWithEverything>> => {
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

export const updateUser = (
  user: User,
  name: string,
  lastName: string,
  email: string,
  gender: string,
  birthday: Date,
  town: string,
  profileText: string
) => {
  console.log(
    "LOCAL:",
    name,
    lastName,
    email,
    gender,
    birthday,
    town,
    profileText
  );

  const defaultFeaders = {
    Accept: "application/json",
    "content-Type": "application/json;charset=UTF-8",
  };

  const url = "/api/users/";
  const options = {
    method: "PATCH",
    headers: defaultFeaders,
    body: JSON.stringify({
      id: user.auth0UserId,
      name: name,
      lastName: lastName,
      email: email,
      gender: gender,
      birthday: birthday,
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

export const addTune = (tune, email, knowOrLearn) => {
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

export const addNewRelation = (addingEmail, addedEmail) => {
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
