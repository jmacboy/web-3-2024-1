import axios from "axios";
import { AuthResponse } from "../models/responses/AuthResponse"
import { LoginRequest } from "../models/requests/LoginRequest";
import { UserInfoResponse } from "../models/responses/UserInfoResponse";
import api from "./interceptors";

export const AuthService = {
    login: (loginRequest: LoginRequest) => {
        return new Promise<AuthResponse>((resolve, reject) => {
            axios.post('http://127.0.0.1:8000/api/token/', loginRequest,{
                withCredentials: true,
            })
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    logout: () => {
        return new Promise<void>((resolve, reject) => {
            axios.post('http://127.0.0.1:8000/auth/logout/',{},{
                withCredentials: true,
            })
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    getUserInfo: () => {
        return new Promise<UserInfoResponse>((resolve, reject) => {
            api.get('usuarios/me/',{
                withCredentials: true,
            })
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    }
}
