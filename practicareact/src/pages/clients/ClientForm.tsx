import { useEffect, useState } from "react";
import { ClientService } from "../../services/ClientService";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";
import NavMenu from "../../components/NavMenu";
import { Button, Card, CardBody, CardHeader, Input, Option, Select, Typography } from "@material-tailwind/react";

const ClientForm = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [edad, setEdad] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [telefono, setTelefono] = useState('')
    const [genero, setGenero] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const { id } = useParams();
    useEffect(() => {
        if (!id) { return; }
        fetchClientById();
    }, [id])
    const fetchClientById = () => {
        if (!id) return;
        ClientService.get(parseInt(id)).then((response) => {
            console.log(response);
            setNombre(response.user.first_name);
            setApellido(response.user.last_name);
            setEdad(response.edad);
            setFechaNacimiento(response.fecha_nacimiento);
            setCiudad(response.ciudad);
            setTelefono(response.telefono);
            setGenero(response.genero);
            setUsername(response.user.username);
        }).catch((error) => {
            console.log(error);
        });
    }
    const onClienteFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            updateClient();
        } else {
            createClient();
        }
    }
    const updateClient = () => {
        if (!id) {
            return;
        }
        ClientService.update({
            id: parseInt(id),
            first_name: nombre,
            last_name: apellido,
            edad: edad,
            fecha_nacimiento: fechaNacimiento,
            ciudad: ciudad,
            telefono: telefono,
            genero: genero,
            username: username
        }).then((response) => {
            console.log(response);
            navigate(Routes.CLIENTS.LIST);
        }).catch((error) => {
            console.log(error);
        });
    }

    const createClient = () => {
        ClientService.create({
            first_name: nombre,
            last_name: apellido,
            edad: edad,
            fecha_nacimiento: fechaNacimiento,
            ciudad: ciudad,
            telefono: telefono,
            genero: genero,
            username: username,
            password: password
        }).then((response) => {
            console.log(response);
            navigate(Routes.CLIENTS.LIST);

        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <>
            <NavMenu />
            <div className="flex justify-center w-screen">
                <Card className="w-[80%] mt-5">
                    <CardBody>
                        <CardHeader color="transparent" shadow={false} >
                            <Typography variant="h4" color="blue-gray">
                                Formulario de Cliente
                            </Typography>
                        </CardHeader>

                        <form onSubmit={onClienteFormSubmit}>

                            <div className="mt-3">
                                <Input label="Email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            {!id && <div className="mt-3">

                                <Input label="Contraseña" value={password}
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            }
                            <div className="mt-3">
                                <Input label="Nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <Input label="Apellido" value={apellido}
                                    onChange={(e) => setApellido(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <Input label="Edad" value={edad} type="number" onChange={(e) => setEdad(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <Input label="Fecha de Nacimiento" value={fechaNacimiento} type="date" onChange={(e) => setFechaNacimiento(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <Input label="Ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <Input label="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <Select variant="outlined" label="Género" value={genero} onChange={(value) => setGenero(value ?? "")}>
                                    <Option value="1">Masculino</Option>
                                    <Option value="0">Femenino</Option>
                                    <Option value="-1">Indefinido</Option>
                                </Select>
                            </div>
                            <div className="mt-3">
                                <Button type="submit">Guardar</Button>
                            </div>

                        </form>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default ClientForm;


