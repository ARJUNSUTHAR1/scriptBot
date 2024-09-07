import axios from "axios";
import { atom, selector } from "recoil";


export const organisationDataState = atom({
    key : "organisationData",
    default : selector({
        key :  "organisationSelector",
        get : async () => {
            const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/organisation/get-all-organisation`);
            return res.data.organisations || [];
        }
    })
})

