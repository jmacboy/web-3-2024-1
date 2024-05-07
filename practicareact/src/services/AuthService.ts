import axios from "axios";
import { AuthResponse } from "../models/responses/AuthResponse"
import { LoginRequest } from "../models/requests/LoginRequest";
import { UserInfoResponse } from "../models/responses/UserInfoResponse";
import api from "./interceptors";

export const AuthService = {
    login: (loginRequest: LoginRequest) => {
        return new Promise<AuthResponse>((resolve, reject) => {
            axios.post('http://localhost:8000/api/token/', loginRequest)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    },
    getUserInfo: () => {
        return new Promise<UserInfoResponse>((resolve, reject) => {
            api.get('http://localhost:8000/api/usuarios/me')
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    }
}
