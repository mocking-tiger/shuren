import axios, { AxiosRequestConfig } from "axios";

// axios 인스턴스 생성
const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
})

// 요청 인터셉터(사용자 요청이 서버에 전달되기 전에 가로채기)
axiosInstance.interceptors.request.use(
    (config)=>{
        // 여기에 작성
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
)

// 응답 인터셉터(서버 응답이 사용자에게 전달되기 전에 가로채기)
axiosInstance.interceptors.response.use(
    (response)=>{
        // 여기에 작성
        return response;
    },
    (error)=>{
        return Promise.reject(error);
    }
)


// AxiosRequestConfig란? Axios 요청 시 전달할 수 있는 옵션들의 타입
// apiGet('/api/users', { params: { id: 1 }, headers: { 'Content-Type': 'application/json' }, timeout: 1000 }) 의 형태로 사용.
export const apiGet = async (url: string,config?: AxiosRequestConfig) => {
    return axiosInstance.get(url, config);
}

export const apiPost = async (url: string, data: unknown, config?: AxiosRequestConfig) => {
    return axiosInstance.post(url, data, config);
}

export const apiPut = async (url: string, data: unknown, config?: AxiosRequestConfig) => {
    return axiosInstance.put(url, data, config);
}

export const apiDelete = async (url: string, config?: AxiosRequestConfig) => {
    return axiosInstance.delete(url, config);
}