
import axios from "axios";
import authHeader from "./auth-header";
import { url } from "../config/api";

const API_URL = url + "/volunteerAssignment/";

// Create a new volunteer assignment
export const createVolunteerAssignment = (volunteer: number, slot:number, zone: number) => {
    return axios
        .post(API_URL, {
            volunteer,
            slot,
            zone
        }, { 
            headers: authHeader() 
        })
        .then((response) => {
            return response.data;
        });
};

// Get volunteer assignments depending on the parameters
export const getVolunteerAssignment = (volunteer?: number, slot?:number, zone?: number) => {
    let elem: Record<string, any> = {}
    if (volunteer) {
        elem.volunteer = volunteer
    }
    if (slot) {
        elem.slot = slot
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

// Update a volunteer assignment
export const updateVolunteer = (volunteer: number, slot:number, zone?: number) => {
    let body: Record<string, any> = {}
    if (zone) {
        body.zone = zone
    }
    let params: Record<string, any> = {
        volunteer: volunteer,
        slot: slot
    }
    let stringifiedParams: string= JSON.stringify(params)
    return axios
        .put(API_URL + stringifiedParams, body, { 
            headers: authHeader() 
        })
        .then((response) => {
            return response.data;
        });
}

// Delete a volunteer assignment
export const deleteVolunteerAssignment = (volunteer: number, slot:number) => {
    let elem: Record<string, any> = {
        volunteer,
        slot
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
