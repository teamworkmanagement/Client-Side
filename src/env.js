let API_URL = "";
let SIGNALR_URL = ""
let DOMAIN = "";

if (process.env.NODE_ENV === "development") {
    API_URL = "https://localhost:9001/api/";
    SIGNALR_URL = "https://localhost:9001";
    DOMAIN = "localhost";
} else {
    API_URL = "https://api.ezteam.tech/api/";
    SIGNALR_URL = "https://api.ezteam.tech";
    DOMAIN = "ezteam.tech";
}

export { API_URL, SIGNALR_URL, DOMAIN };