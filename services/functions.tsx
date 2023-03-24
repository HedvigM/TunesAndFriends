import { User } from "@prisma/client";
import { listUsers } from "./local";

/* Cached Tunes from the session */
export const getMyCache = async (url: string) => {
  const cachedResponse = JSON.parse(localStorage.getItem(url));
  const expiryTime = new Date().getTime() - 1000 * 60 * 60 * 6;

  if (cachedResponse && cachedResponse.timestamp > expiryTime) {
    return cachedResponse.data;
  } else {
    return fetch(url)
      .then((res) => res.json())
      .then((data) => {
        const object = { data: data, timestamp: new Date().getTime() };
        localStorage.setItem(url, JSON.stringify(object));
        return data;
      });
  }
};

/* List of all T&F users */
export const getCachedListOfUsers = async (user: User) => {
  const cachedResponse = JSON.parse(
    localStorage.getItem(`${user.email}-userList`)
  );
  const expiryTime = new Date().getTime() - 1000 * 60 * 60 * 6;

  if (cachedResponse && cachedResponse.timestamp > expiryTime) {
    return cachedResponse.data;
  } else {
    const fetchedList = await listUsers();
    if (fetchedList.success) {
      const object = {
        data: fetchedList.data,
        timestamp: new Date().getTime(),
      };
      localStorage.setItem(`${user.email}-userList`, JSON.stringify(object));
      return fetchedList.data;
    }
  }
};
