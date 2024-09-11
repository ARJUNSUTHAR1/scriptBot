import { atom, selectorFamily } from 'recoil';
import axios from 'axios';

// Define an atom to store bot data, if needed
export const botDataState = atom({
    key: 'botData',
    default: {}, // Initialize with an empty array or other default value
});

// Parameterized selectorFamily to fetch bot data
export const botSelector = selectorFamily({
    key: 'botSelector',
    get: (id) => async () => {
         // Extract parameters
        try {
         
            const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/botprofile/get-botprofile/${id}`);
            return res.data.bot || []; // Return the fetched data
        } catch (error) {
            console.error('Failed to fetch bots:', error);
            return []; // Return an empty array on error
        }
    },
});
