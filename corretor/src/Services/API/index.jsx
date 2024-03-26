import axios from "axios"

export const api = axios.create({
    baseURL: "https://corretor-gabarito-backend.vercel.app/"
    
})