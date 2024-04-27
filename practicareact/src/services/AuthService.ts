import axios from "axios";
import { AuthResponse } from "../models/AuthResponse"
import { LoginRequest } from "../models/LoginRequest";

export const AuthService = {
    login: (loginRequest: LoginRequest) => {
        return new Promise<AuthResponse>((resolve, reject) => {
            axios.post('http://localhost:8000/api/token/', loginRequest)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
        });
    }
}
