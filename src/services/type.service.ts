
import axios from "axios";
import authHeader from "./auth-header";
import { url } from "../config/api";

const API_URL = url + "/type/";

// Create a new type
export const createType = (nameType: string) => {
    return axios
        .post(API_URL, {
            headers: authHeader(),
            nameType
        })
        .then((response) => {
            return response.data;
        });
};

// Get types depending on the parameters
export const getType = (idType?: number, nameType?: string) => {
    let elem: Record<string, any> = {}
    if (idType) {
        elem.idType = idType
    }
    if (nameType) {
        elem.nameType = nameType
    }
    let stringifiedElem: string= JSON.stringify(elem)
    return axios
        .get(API_URL + stringifiedElem)
        .then((response) => {
            return response.data;
        });
};

// Update a type
export const updateType = (idType: number, nameType?: string) => {
    let elem: Record<string, any> = {
        headers: authHeader()
    }
    if (nameType) {
        elem.nameType = nameType
    }
    return axios
        .put(API_URL + idType, elem)
        .then((response) => {
            return response.data;
        });
}

// Delete a type
export const deleteVolunteerAssignment = (idType: number) => {
    return axios
        .delete(API_URL + idType, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
}
