import {ACCESS_TOKEN} from "constants"

export const checkIsAuth = () => {
  const isAuth = localStorage.getItem(ACCESS_TOKEN);
  return isAuth !== null ? true : false
};
