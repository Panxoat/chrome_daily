import axios from "axios";

const API_URL = "https://api.unsplash.com";

const instance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Client-ID ${process.env.NEXT_PUBLIC_ACCESS_KEY}`,
  },
});

export default instance;
