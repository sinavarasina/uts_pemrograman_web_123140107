import axios from "axios";

export const fetcher = axios.create({
    baseURL: "https://itunes.apple.com/",
    timeout: 8000,
    headers: { Accept: "application/json" },
});

fetcher.interceptors.response.use(
    (res) => res.data,
    (err) => {
        console.error("Api Error:", err);
        throw err;
    }
)
