
import axios from "axios";
import authHeader from "./auth-header";
import { url } from "../config/api";

const API_URL = url + "/zone/";

// Create a new zone
export const createZone = (nameZone: string) => {
    return axios
        .post(API_URL, {
            headers: authHeader(),
            nameZone
        })
        .then((response) => {
            return response.data;
        });
};

// Get zones depending on the parameters
export const getZone = (idZone?: number, nameZone?: string) => {
    let elem: Record<string, any> = {}
    if (idZone) {
        elem.idZone = idZone
    }
    if (nameZone) {
        elem.nameZone = nameZone
    }
    let stringifiedElem: string= JSON.stringify(elem)
    return axios
        .get(API_URL + stringifiedElem)
        .then((response) => {
            return response.data;
        });
};

// Update a zone
export const updateZone = (idZone: number, nameZone?: string) => {
    let elem: Record<string, any> = {
        headers: authHeader()
    }
    if (nameZone) {
        elem.nameZone = nameZone
    }
    return axios
        .put(API_URL + idZone.toString(), elem)
        .then((response) => {
            return response.data;
        });
}

// Delete a zone
export const deleteZone = (idZone: number) => {
    return axios
        .delete(API_URL + idZone.toString, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
}
