
import axios from "axios";
import authHeader from "./auth-header";
import { url } from "../config/api";

const API_URL = url + "/slot/";

// Create a new slot
export const createSlot = (startDate: Date, endDate: Date) => {
    return axios
        .post(API_URL, {
            headers: authHeader(),
            startDate,
            endDate
        })
        .then((response) => {
            return response.data;
        });
};

// Get slots depending on the parameters
export const getSlot = (idSlot?: number, startDate?: Date, endDate?: Date) => {
    let elem: Record<string, any> = {}
    if (idSlot) {
        elem.idSlot = idSlot
    }
    if (startDate) {
        elem.startDate = startDate
    }
    if (endDate) {
        elem.endDate = endDate
    }
    let stringifiedElem: string= JSON.stringify(elem)
    return axios
        .get(API_URL + stringifiedElem)
        .then((response) => {
            return response.data;
        });
};

// Update a slot
export const updateSlot = (idSlot: number, startDate?: Date, endDate?: Date) => {
    let elem: Record<string, any> = {
        headers: authHeader()
    }
    if (startDate) {
        elem.startDate = startDate
    }
    if (endDate) {
        elem.endDate = endDate
    }
    return axios
        .put(API_URL + idSlot, elem)
        .then((response) => {
            return response.data;
        });
}

// Delete a slot
export const deleteSlot = (idSlot: number) => {
    return axios
        .delete(API_URL + idSlot, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
}
