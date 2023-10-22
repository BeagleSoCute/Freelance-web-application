import { registerApi } from "apis/auth.api";

export const register = async (data) => {
  const { email, firstName, lastName, phoneNumber, password } = data;
  const transformData = {
    email,
    password,
    first_name: firstName,
    last_name: lastName,
    phone_number: phoneNumber,
  }

  try {
    const {success, errorMessage} = await registerApi(transformData);
    return {errorMessage, success};
  } catch (err) {
    return false;
  }
};
