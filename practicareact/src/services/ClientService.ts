import axios from "axios"
import { Cliente } from "../models/Cliente"

export const ClientService = {
    create: (client: Cliente) => {
        return new Promise<Cliente>((resolve, reject) => {
            axios.post('http://localhost:8000/api/clientes/', client)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    list: () => {
        return new Promise<Cliente[]>((resolve, reject) => {
            axios.get('http://localhost:8000/api/clientes/')
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    get: (id: number) => {
        return new Promise<Cliente>((resolve, reject) => {
            axios.get(`http://localhost:8000/api/clientes/${id}/`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    update: (client: Cliente) => {
        return new Promise<Cliente>((resolve, reject) => {
            axios.put(`http://localhost:8000/api/clientes/${client.id}/`, client)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    delete: (id: number) => {
        return new Promise((resolve, reject) => {
            axios.delete(`http://localhost:8000/api/clientes/${id}/`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }
}