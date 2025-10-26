/**
 * @deprecated This file is deprecated. Use `lib/api` instead.
 * 
 * This file is kept for backwards compatibility but will be removed in the future.
 * Please migrate to the new API service layer: `import { ... } from 'lib/api'`
 * 
 * Example migration:
 * ```typescript
 * // Old:
 * import { getUser, addUser } from 'services/local';
 * 
 * // New:
 * import { getUserByAuth0Id, createUser, getOrCreateUser } from 'lib/api';
 * ```
 */

// Type imports are re-exported from lib/api

// Re-export from new API layer for backwards compatibility
export {
  listUsers,
  listUsersWithTune,
  getUserById,
  createUser as addUser,
  getUserByAuth0Id as getUser,
  updateUser,
  getOrCreateUser,
} from "lib/api";

// Legacy functions that don't have direct equivalents yet
// These are kept as-is for now

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
