import axios from "axios";
import { atom, selector } from "recoil";


export const userDataState = atom({
    key : "userData",
    default : selector({
        key :  "userSelector",
        get : async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/user/get-all-user`);
            return res.data.organisations
        }
    })
})
