import {$host} from "./index";

export const fetchCategories = async (userId) => {
    const {data} = await $host.get(`api/category/${userId}`)
    return data
}

export const createCategory = async (category) => {
    const {data} = await $host.post('api/category', category)
    return data
}

export const deleteCategory = async (id) => {
    const {data} = await $host.delete(`api/category/${id}`)
    return data
}

export const setCategory = async (id, category) => {
    const {data} = await $host.patch(`api/category/${id}`, category)
    return data
}

