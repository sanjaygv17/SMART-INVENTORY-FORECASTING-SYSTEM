import axios from "axios";

const client = axios.create({

    baseURL: "http://localhost:5000/api",

    headers: {
        "Content-Type": "application/json"
    },

    timeout: 10000

});

client.interceptors.request.use(

    (config) => {

        console.log(
            `${config.method?.toUpperCase()} ${config.url}`
        );

        return config;

    },

    (error) => Promise.reject(error)

);

client.interceptors.response.use(

    (response) => response,

    (error) => {

        console.error("API Error:", error);

        return Promise.reject(error);

    }

);

export default client;