
import axios from "axios";
import authHeader from "./auth-header";
import { url } from "../config/api";

const API_URL = url + "/admin/";

// Create a new user
export const createUser = (username: string, password: string) => {
    return axios
        .post(API_URL, {
            headers: authHeader(),
            username,
            password
        })
        .then((response) => {
            return response.data;
        });
};

// Get users depending on the parameters
export const getUser = (username?: string) => {
    let elem: Record<string, any> = {}
    if (username) {
        elem.username = username
    }
    let stringifiedElem: string= JSON.stringify(elem)
    return axios
        .get(API_URL + stringifiedElem, {headers: authHeader()})
        .then((response) => {
            return response.data;
        });
};

// Update a user
export const updateUser = (username: string, password?: string) => {
    let body: Record<string, any> = {
        headers: authHeader()
    }
    if (password) {
        body.password = password
    }
    let params: Record<string, any> = {
        username: username
    }
    let stringifiedParams: string= JSON.stringify(params)
    return axios
        .put(API_URL + stringifiedParams, body)
        .then((response) => {
            return response.data;
        });
}

// Delete a user
export const deleteUser = (username: string) => {
    let elem: Record<string, any> = {
        username: username
    }
    let stringifiedElem: string= JSON.stringify(elem)
    return axios
        .delete(API_URL + stringifiedElem, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
}
