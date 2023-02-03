
import axios from "axios";
import authHeader from "./auth-header";
import { url } from "../config/api";

const API_URL = url + "/activity/";

// Create a new activity
export const createActivity = (nameActivity: string, type: number) => {
    return axios
        .post(API_URL, {
            headers: authHeader(),
            nameActivity,
            type
        })
        .then((response) => {
            return response.data;
        });
};

// Get activities depending on the parameters
export const getActivity = (idActivity?: number, nameActivity?: string, type?: number) => {
    let elem: Record<string, any> = {}
    if (idActivity) {
        elem.idActivity = idActivity
    }
    if (nameActivity) {
        elem.nameActivity = nameActivity
    }
    if (type) {
        elem.type = type
    }
    let stringifiedElem: string= JSON.stringify(elem)
    return axios
        .get(API_URL + stringifiedElem)
        .then((response) => {
            return response.data;
        });
};

// Update an activity
export const updateActivity = (idActivity: number, nameActivity?: string, type?: number) => {
    let elem: Record<string, any> = {
        headers: authHeader()
    }
    if (nameActivity) {
        elem.nameActivity = nameActivity
    }
    if (type) {
        elem.type = type
    }
    return axios
        .put(API_URL + idActivity, elem)
        .then((response) => {
            return response.data;
        });
}

// Delete an activity
export const deleteActivity = (idActivity: number) => {
    return axios
        .delete(API_URL + idActivity, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
}
