import axios from "axios"

export const Createuser = async (payload) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/user/create-user`, payload);
        return response.data;

    } catch (error) {
        return error.message
    }
}

export const GetuserData = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/user/get-all-user`);
        return response.data;

    } catch (error) {
        console.log(error)

        return error.message
    }
}
export const Deleteuser = async (id) => {
    try {

        const response = await axios.delete(`${import.meta.env.VITE_SERVER}/api/user/delete-user/${id}`);
        return response.data;

    } catch (error) {
        return error.message
    }
}

export const Updateuser = async (id, payload) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_SERVER}/api/user/update-user/${id}`, payload);
        return response.data;

    } catch (error) {
        return error.message
    }
}

export const Loginuser = async (payload) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/user/login`, payload,{
            withCredentials: true
          });
        return response.data;

    } catch (error) {
        console.log(error)

        return error.message
    }
}

export const GetCurrentUser = async () => {
    try {
      const token = localStorage.getItem("Token");
  
      if (!token) {
        // Handle the case where the token is not available
        throw new Error("Token not available");
      }
        //  console.log(import.meta.env.VITE_SERVER)
      const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/auth/get-current-user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      return response.data;
    } catch (error) {
        console.log(error)
      return error.message;
    }
  };
