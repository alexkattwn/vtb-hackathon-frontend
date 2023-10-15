import axios from "axios"
import { getTokenFromLocalStorage } from "@/helpers/localstorage.helper"

export const instance = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_APP_API_URL
})

export const instanceWithAuth = axios.create({
    withCredentials: true,
    baseURL: import.meta.env.VITE_APP_API_URL,
    headers: {
        Authorization: `Bearer ${getTokenFromLocalStorage() || ''}`,
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
    }
})