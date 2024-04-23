import { useEffect, useState } from "react";
import { ClientService } from "../services/ClientService";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../routes/CONSTANTS";

const ClientForm = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [edad, setEdad] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState('')
    const [ciudad, setCiudad] = useState('')
    const [telefono, setTelefono] = useState('')
    const [genero, setGenero] = useState('')
    const { id } = useParams();
    useEffect(() => {
        if (!id) { return; }
        fetchClientById();
    }, [id])
    const fetchClientById = () => {
        if (!id) return;
        ClientService.get(parseInt(id)).then((response) => {
            console.log(response);
            setNombre(response.nombres);
            setApellido(response.apellidos);
            setEdad(response.edad);
            setFechaNacimiento(response.fecha_nacimiento);
            setCiudad(response.ciudad);
            setTelefono(response.telefono);
            setGenero(response.genero);
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
            nombres: nombre,
            apellidos: apellido,
            edad: edad,
            fecha_nacimiento: fechaNacimiento,
            ciudad: ciudad,
            telefono: telefono,
            genero: genero
        }).then((response) => {
            console.log(response);
            navigate(Routes.CLIENTS.LIST);
        }).catch((error) => {
            console.log(error);
        });
    }

    const createClient = () => {
        ClientService.create({
            nombres: nombre,
            apellidos: apellido,
            edad: edad,
            fecha_nacimiento: fechaNacimiento,
            ciudad: ciudad,
            telefono: telefono,
            genero: genero
        }).then((response) => {
            console.log(response);

        }).catch((error) => {
            console.log(error);
        });
    }
    return (<form onSubmit={onClienteFormSubmit}>
        <div>
            <label>Nombre</label>
            <input
                value={nombre}
                onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div>
            <label>Apellido</label>
            <input value={apellido}
                onChange={(e) => setApellido(e.target.value)} />
        </div>
        <div>
            <label>Edad</label>
            <input value={edad} type="number" onChange={(e) => setEdad(e.target.value)} />
        </div>
        <div>
            <label>Fecha de Nacimiento</label>
            <input value={fechaNacimiento} type="date" onChange={(e) => setFechaNacimiento(e.target.value)} />
        </div>

        <div>
            <label>Ciudad</label>
            <input value={ciudad} onChange={(e) => setCiudad(e.target.value)} />
        </div>
        <div>
            <label>Teléfono</label>
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
        </div>
        <div>
            <label>Género</label>
            <select value={genero} onChange={(e) => setGenero(e.target.value)}>
                <option value="1">Masculino</option>
                <option value="0">Femenino</option>
                <option value="-1">Indefinido</option>
            </select>
        </div>
        <div>
            <button>Guardar</button>
        </div>

    </form>);
}

export default ClientForm;

