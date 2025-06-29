import axios from "@/Utils/AxiosInstance";


export const getAllMataKuliah = () => axios.get("/mata-kuliah");
export const getMataKuliah = (id) => axios.get(`/mata-kuliah/${id}`);
export const storeMataKuliah = (data) => axios.post("/mata-kuliah", data);
export const updateMataKuliah = (id, data) => axios.put(`/mata-kuliah/${id}`, data);
export const deleteMataKuliah = (id) => axios.delete(`/mata-kuliah/${id}`);