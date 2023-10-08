import { registerApi } from "apis/auth.api";

export const register = async (data) => {
  try {
    const {success, errorMessage} = await registerApi(data);
    return {errorMessage, success};
  } catch (err) {
    return false;
  }
};
