
import axios from "axios";
import authHeader from "./auth-header";
import { url } from "../config/api";

const API_URL = url + "/test/";

// Test if the user has access to the public content
export const getPublicContent = () => {
  return axios
    .get(API_URL + "public");
};

// Test if the user has access to the admin content
export const getAdminBoard = () => {
  return axios
    .get(API_URL + "admin", { 
      headers: authHeader() 
    });
};
