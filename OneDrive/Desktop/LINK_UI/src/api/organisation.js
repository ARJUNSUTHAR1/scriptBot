import axios from "axios"

export const Createorganisation = async (payload) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/organisation/create-organisation`, payload);
        return response.data;

    } catch (error) {
        return error.message
    }
}

export const GetorganisationData = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/organisation/get-all-organisation`);
        return response.data;

    } catch (error) {
        return error.message
    }
}
export const Deleteorganisation = async (id) => {
    try {

        const response = await axios.delete(`${import.meta.env.VITE_SERVER}/api/organisation/delete-organisation/${id}`);
        return response.data;

    } catch (error) {
        return error.message
    }
}

export const Updateorganisation = async (id, payload) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER}/api/organisation/update-organisation/${id}`, payload);
        return response.data;

    } catch (error) {
        return error.message
    }
}
