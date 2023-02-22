import {$host} from "./index";
import jwt_decode from "jwt-decode"
import axios from "axios";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/register', {email, password})
    return data
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data))
    return jwt_decode(data.token)
}

export const addUserImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file)
    formData.append("upload_preset", "meowris")
    const {data} = await axios.post('https://api.cloudinary.com/v1_1/djgzx0tmm/image/upload', formData)
    return data
}

export const setUser = async (id, img) => {
    const {data} = await $host.patch(`api/user/${id}`, img)
    return data
}