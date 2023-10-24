import axios from "axios"
import { userLocalStorage } from "./localService"

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCBTw6FuZyAwOCIsIkhldEhhblN0cmluZyI6IjA3LzAzLzIwMjQiLCJIZXRIYW5UaW1lIjoiMTcwOTc2OTYwMDAwMCIsIm5iZiI6MTY4Njc2MjAwMCwiZXhwIjoxNzA5OTE3MjAwfQ.KMixzquIcyG1HcsZ_iekv3cHfqWMebGVfzp349mNosg"

export const https = axios.create({
    baseURL: "https://movienew.cybersoft.edu.vn/api",
    headers: {
        TokenCybersoft: token,
        Authorization: `Bearer ${userLocalStorage.get()?.accessToken}`,
        timeout: 1000,
    }
})