import {$host} from "./index";
import axios from "axios";

export const fetchSelectedMemories = async (categoryId) => {
    const {data} = await $host.get(`api/memory/all/${categoryId}`)
    return data
}

export const fetchSelectedMemory = async (memoryId) => {
    const {data} = await $host.get(`api/memory/one/${memoryId}`)
    return data
}

export const createMemoryImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file)
    formData.append("upload_preset", "meowris")
    const {data} = await axios.post('https://api.cloudinary.com/v1_1/djgzx0tmm/image/upload', formData)
    return data
}

export const setMemoryImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file)
    formData.append("upload_preset", "meowris")
    const {data} = await axios.post('https://api.cloudinary.com/v1_1/djgzx0tmm/image/upload', formData)
    return data
}

export const createMemory = async (memory) => {
    const {data} = await $host.post('api/memory', memory)
    return data
}

export const setMemory = async (id, memory) => {
    const {data} = await $host.patch(`api/memory/${id}`, memory)
    return data
}

export const deleteMemory = async (id) => {
    const {data} = await $host.delete(`api/memory/${id}`)
    return data
}
