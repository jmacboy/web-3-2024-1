import { Producto } from "../models/Producto"
import api from "./interceptors";

export const ProductService = {
    create: (client: Producto) => {
        return new Promise<Producto>((resolve, reject) => {
            api.post('productos/', client)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    list: () => {
        return new Promise<Producto[]>((resolve, reject) => {
            api.get('productos/')
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    get: (id: number) => {
        return new Promise<Producto>((resolve, reject) => {
            api.get(`productos/${id}/`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    update: (client: Producto) => {
        return new Promise<Producto>((resolve, reject) => {
            api.put(`productos/${client.id}/`, client)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    },
    delete: (id: number) => {
        return new Promise((resolve, reject) => {
            api.delete(`productos/${id}/`)
                .then(response => resolve(response.data))
                .catch(error => reject(error))
        });
    }
}