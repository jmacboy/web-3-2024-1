import { useEffect, useState } from "react";
import { ClientService } from "../services/ClientService";
import { Cliente } from "../models/Cliente";
import { Link } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";

const ClientList = () => {
    const [clientList, setClientList] = useState<Cliente[]>([])
    useEffect(() => {
        fetchClientList()
    }, [])

    const fetchClientList = () => {
        ClientService.list().then((response) => {
            setClientList(response);
        }).catch((error) => {
            console.log(error);
        });
    }
    function deleteClient(id?: number) {
        if (!id) {
            return;
        }
        ClientService.delete(id).then(() => {
            fetchClientList();
        }).catch((error) => {
            console.log(error);
        });
    }

    return (<div>
        <h1>Lista de Clientes</h1>
        <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                    <th>Fecha de Nacimiento</th>
                    <th>Ciudad</th>
                    <th>Teléfono</th>
                    <th>Género</th>
                </tr>
            </thead>
            <tbody>
                {clientList.map((client: Cliente) =>
                    <tr key={"client" + client.id}>
                        <td>{client.id}</td>
                        <td>{client.nombres}</td>
                        <td>{client.apellidos}</td>
                        <td>{client.edad}</td>
                        <td>{client.fecha_nacimiento}</td>
                        <td>{client.ciudad}</td>
                        <td>{client.telefono}</td>
                        <td>{client.genero}</td>
                        <td>
                            <Link to={Routes.CLIENTS.EDIT_PARAM(client.id)}
                                className="btn btn-primary">Editar</Link>
                        </td>
                        <td>
                            <button className="btn btn-danger"
                                onClick={() => {
                                    deleteClient(client.id)
                                }}>Eliminar</button>
                        </td>
                    </tr>)}
            </tbody>
        </table>
    </div>);
}

export default ClientList;