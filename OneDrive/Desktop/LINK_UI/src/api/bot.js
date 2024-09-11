import axios from "axios";
export const Updatebot = async (id, payload) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER}/api/botprofile/update-botprofile/${id}`, payload);
        return response.data;

    } catch (error) {
        return error.message
    }
}


export const GetCurrentBot = async (id) => {
    try {
        //  console.log(import.meta.env.VITE_SERVER)
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/botprofile/get-botprofile/${id}`
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      );
  
      return response.data;
    } catch (error) {
      return error.message;
    }
  };