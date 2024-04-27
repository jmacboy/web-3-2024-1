import { Cliente } from "../models/Cliente"
import api from "./interceptors";
import { ClienteRequest } from "../models/ClienteUpdateRequest";

export const ClientService = {
    create: (client: ClienteRequest) => {
        return new Promise<Cliente>((resolve, reject) => {
            api.post('clientes/', client)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    list: () => {
        return new Promise<Cliente[]>((resolve, reject) => {
            api.get('clientes/')
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    get: (id: number) => {
        return new Promise<Cliente>((resolve, reject) => {
            api.get(`clientes/${id}/`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    update: (client: ClienteRequest) => {
        return new Promise<Cliente>((resolve, reject) => {
            api.put(`clientes/${client.id}/`, client)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    delete: (id: number) => {
        return new Promise((resolve, reject) => {
            api.delete(`clientes/${id}/`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }
}