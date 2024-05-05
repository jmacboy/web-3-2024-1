import { useEffect, useState } from "react";
import { ClientService } from "../../services/ClientService";
import { Cliente } from "../../models/Cliente";
import { Link } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";
import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import TailwindLink from "../../components/TailwindLink";
import NavMenu from "../../components/NavMenu";

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

    return (
        <>
            <NavMenu />

            <div className="flex justify-center w-screen ">
                <Card className="h-full w-[90%] overflow-scroll mt-5">
                    <CardBody>
                        <CardHeader shadow={false}>
                            <h1 className="text-3xl font-bold">Lista de Clientes</h1>

                        </CardHeader>
                        <table className="w-full min-w-max table-auto text-left">
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
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientList.map((client: Cliente) =>
                                    <tr className="even:bg-blue-gray-50/50" key={"client" + client.id}>
                                        <td>{client.id}</td>
                                        <td>{client.user.first_name}</td>
                                        <td>{client.user.last_name}</td>
                                        <td>{client.edad}</td>
                                        <td>{client.fecha_nacimiento}</td>
                                        <td>{client.ciudad}</td>
                                        <td>{client.telefono}</td>
                                        <td>{client.genero}</td>
                                        <td>{client.user.username}</td>
                                        <td>
                                            <TailwindLink text="Editar" to={Routes.CLIENTS.EDIT_PARAM(client.id)} />
                                        </td>
                                        <td>
                                            <Button size="sm" color="red"
                                                onClick={() => {
                                                    deleteClient(client.id)
                                                }}>Eliminar</Button>
                                        </td>
                                    </tr>)}
                            </tbody>
                        </table>
                    </CardBody>
                </Card>
            </div>
        </>);
}

export default ClientList;