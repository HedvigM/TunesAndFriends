import { User } from "@auth0/auth0-react";
import { userService } from "./userService";

/* Cached Tunes from the session */
export const getMyCache = async (url: string) => {
  const cachedString = localStorage.getItem(url);
  const cachedResponse = cachedString ? JSON.parse(cachedString) : null;
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

export const getCachedListOfUsers = async (user: User) => {
  const cachedString = localStorage.getItem(`${user.email}-userList`);
  const cachedResponse = cachedString ? JSON.parse(cachedString) : null;
  const expiryTime = new Date().getTime() - 1000 * 60 * 60 * 6;

  if (cachedResponse && cachedResponse.timestamp > expiryTime) {
    return cachedResponse.data;
  } else {
    const fetchedList = await userService.listUsers();
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
