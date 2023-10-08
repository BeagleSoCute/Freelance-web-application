import { registerApi } from "apis/auth.api";
import { notification } from "helpers/notification.helper";

export const register = async (data) => {
  try {
    const {success} = await registerApi(data);
    notification({ type: "success", message: "Register Success" });
    return success;
  } catch (err) {
    return false;
  }
};
