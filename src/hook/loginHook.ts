import moment from "moment";
import { useEffect, useState } from "react";
import { loginSessionLimit } from "../dataModel/constants";

export interface UserSession {
  timestamp: Date;
  expiry: Date;
}

const useLoginHook = (username: string) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userSessionObjectString = window.sessionStorage.getItem(username);
    if (userSessionObjectString) {
      const { expiry }: UserSession = JSON.parse(userSessionObjectString);
      const currentDate = moment().toDate();
      const diff = moment(currentDate).diff(expiry, "second");
      setIsLoggedIn(diff < loginSessionLimit);

      // session expired
      if (diff > loginSessionLimit) {
        window.sessionStorage.removeItem(username);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [username]);

  return isLoggedIn;
};

export { useLoginHook };
