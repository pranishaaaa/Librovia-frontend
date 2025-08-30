import { postRequest, putRequest } from "./apiService";

export async function login({ email, password }) {
  const response = await postRequest("/login", { email, password });
  return response;
}

export async function register({ name, email, password, role }) {
  role = role.toLowerCase();

  const response = await postRequest("/register", {
    name,
    email,
    password,
    role,
  });
  return response;
}

export async function updateProfile({ name, email, profilePicture }) {
  const response = putRequest("/profile", { name, email, profilePicture });
  return response;
}
