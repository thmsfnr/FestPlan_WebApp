
import axios from "axios";
import authHeader from "./auth-header";
import { url } from "../config/api";

const API_URL = url + "/volunteer/";

// Create a new volunteer
export const createVolunteer = (name: string, surname: string, email?: string) => {
    let elem: Record<string, any> = {
        headers: authHeader(),
        name,
        surname
    }
    if (email) {
        elem.email = email
    }
    return axios
        .post(API_URL, elem)
        .then((response) => {
            return response.data;
        });
};

// Get volunteers depending on the parameters
export const getVolunteer = (idVolunteer?: number, name?: string, surname?: string, email?: string) => {
    let elem: Record<string, any> = {}
    if (idVolunteer) {
        elem.idVolunteer = idVolunteer
    }
    if (name) {
        elem.name = name
    }
    if (surname) {
        elem.surname = surname
    }
    if (email) {
        elem.email = email
    }
    let stringifiedElem: string= JSON.stringify(elem)
    return axios
        .get(API_URL + stringifiedElem)
        .then((response) => {
            return response.data;
        });
};

// Update a volunteer
export const updateVolunteer = (idVolunteer: number, name?: string, surname?: string, email?: string) => {
    let elem: Record<string, any> = {
        headers: authHeader()
    }
    if (name) {
        elem.name = name
    }
    if (surname) {
        elem.surname = surname
    }
    if (email) {
        elem.email = email
    }
    return axios
        .put(API_URL + idVolunteer.toString(), elem)
        .then((response) => {
            return response.data;
        });
}

// Delete a volunteer
export const deleteVolunteer = (idVolunteer: number) => {
    return axios
        .delete(API_URL + idVolunteer.toString, {
            headers: authHeader()
        })
        .then((response) => {
            return response.data;
        });
}
