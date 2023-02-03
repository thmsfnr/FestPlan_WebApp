
import axios from "axios";
import { url } from "../config/api";

const API_URL = url + "/auth/";

// Login action
export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

// Logout action
export const logout = () => {
  localStorage.removeItem("user");
};

// Get the current user
export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr) return JSON.parse(userStr);

  return null;
};
