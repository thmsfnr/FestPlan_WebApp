
import axios from "axios";
import authHeader from "./auth-header";
import { url } from "../config/api";

const API_URL = url + "/activityAssignment/";

// Create a new activity assignment
export const createActivityAssignment = (activity: number, zone: number) => {
    let elem: Record<string, any> = {
        headers: authHeader(),
        activity,
        zone
    }
    return axios
        .post(API_URL, elem)
        .then((response) => {
            return response.data;
        });
};

// Get activity assignments depending on the parameters
export const getActivityAssignment = (activity?: number, zone?: number) => {
    let elem: Record<string, any> = {}
    if (activity) {
        elem.activity = activity
    }
    if (zone) {
        elem.zone = zone
    }
    let stringifiedElem: string= JSON.stringify(elem)
    return axios
        .get(API_URL + stringifiedElem)
        .then((response) => {
            return response.data;
        });
};

// Update an activity assignment
export const updateActivityAssignment = (activity: number, zone: number) => {
    let body: Record<string, any> = {
        headers: authHeader()
    }
    let params: Record<string, any> = {
        activity: activity,
        zone: zone
    }
    let stringifiedParams: string= JSON.stringify(params)
    return axios
        .put(API_URL + stringifiedParams, body)
        .then((response) => {
            return response.data;
        });
}

// Delete an activity assignment
export const deleteActivityAssignment = (activity: number, zone: number) => {
    let elem: Record<string, any> = {
        activity,
        zone
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
