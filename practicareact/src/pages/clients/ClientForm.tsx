import { useEffect, useState } from "react";
import { ClientService } from "../../services/ClientService";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";
import NavMenu from "../../components/NavMenu";
import { Button, Card, CardBody, CardHeader, Input, Option, Select, Typography } from "@material-tailwind/react";
import { changeInput, touchInput } from "../../utilities/FormUtils";
import FormError from "../../components/FormError";

const ClientForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    const validate = (newInputs: Inputs): Errors => {
        const newErrors: Errors = {}

        if (!newInputs.nombre) {
            newErrors.nombre = "Ingrese un nombre válido."
        }
        if (!newInputs.apellido) {
            newErrors.apellido = "Ingrese un apellido válido."
        }
        if (!newInputs.edad) {
            newErrors.edad = "Ingrese una edad válida."
        }
        if (!newInputs.fechaNacimiento) {
            newErrors.fechaNacimiento = "Ingrese una fecha de nacimiento válida."
        }
        if (!newInputs.ciudad) {
            newErrors.ciudad = "Ingrese una ciudad válida."
        }
        if (!newInputs.telefono) {
            newErrors.telefono = "Ingrese un teléfono válido."
        }
        if (!newInputs.genero) {
            newErrors.genero = "Ingrese un género válido."
        }
        if (!newInputs.username) {
            newErrors.username = "Ingrese un email válido."
        }
        if (!id && !newInputs.password) {
            newErrors.password = "Ingrese una contraseña válida."
        }

        return newErrors
    }
    type Inputs = {
        nombre: string,
        apellido: string,
        edad: string,
        fechaNacimiento: string,
        ciudad: string,
        telefono: string,
        genero: string,
        username: string,
        password: string
    }
    const [inputs, setInputs] = useState<Inputs>({
        nombre: "",
        apellido: "",
        edad: "",
        fechaNacimiento: "",
        ciudad: "",
        telefono: "",
        genero: "",
        username: "",
        password: ""
    })
    type Errors = Partial<Record<keyof Inputs, string>>
    const [errors, setErrors] = useState<Errors>(validate(inputs))

    type Touched = Partial<Record<keyof Inputs, boolean>>
    const [touched, setTouched] = useState<Touched>({})

    useEffect(() => {
        if (!id) { return; }
        fetchClientById();
    }, [id])
    const fetchClientById = () => {
        if (!id) return;
        ClientService.get(parseInt(id)).then((response) => {
            console.log(response);
            setInputs({
                nombre: response.user.first_name,
                apellido: response.user.last_name,
                edad: response.edad,
                fechaNacimiento: response.fecha_nacimiento,
                ciudad: response.ciudad,
                telefono: response.telefono,
                genero: response.genero.toString(),
                username: response.user.username,
                password: ""
            });
        }).catch((error) => {
            console.log(error);
        });
    }
    const onClienteFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const validatedErrors = validate(inputs);
        setErrors(validatedErrors);
        setTouched(Object.keys(inputs).reduce((acc, key) => ({ ...acc, [key]: true }), {} as Touched));
        const isValid = Object.keys(validatedErrors).length === 0;

        if (!isValid) {
            return;
        }
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
            first_name: inputs.nombre,
            last_name: inputs.apellido,
            edad: inputs.edad,
            fecha_nacimiento: inputs.fechaNacimiento,
            ciudad: inputs.ciudad,
            telefono: inputs.telefono,
            genero: inputs.genero,
            username: inputs.username,
        }).then((response) => {
            console.log(response);
            navigate(Routes.CLIENTS.LIST);
        }).catch((error) => {
            console.log(error);
        });
    }

    const createClient = () => {
        ClientService.create({
            first_name: inputs.nombre,
            last_name: inputs.apellido,
            edad: inputs.edad,
            fecha_nacimiento: inputs.fechaNacimiento,
            ciudad: inputs.ciudad,
            telefono: inputs.telefono,
            genero: inputs.genero,
            username: inputs.username,
            password: inputs.password
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
                                    value={inputs.username}
                                    onBlur={() => touchInput("username", setTouched, touched)}

                                    onChange={(e) => changeInput("username", e.target.value, setInputs, inputs, setErrors, validate)} />
                                {errors.username && touched.username ? <FormError>{errors.username}</FormError> : null}

                            </div>
                            {!id && <div className="mt-3">

                                <Input label="Contraseña" value={inputs.password}
                                    onBlur={() => touchInput("password", setTouched, touched)}

                                    onChange={(e) => changeInput("password", e.target.value, setInputs, inputs, setErrors, validate)} />
                                {errors.password && touched.password ? <FormError>{errors.password}</FormError> : null}

                            </div>
                            }
                            <div className="mt-3">
                                <Input label="Nombre"
                                    value={inputs.nombre}
                                    onBlur={() => touchInput("nombre", setTouched, touched)}

                                    onChange={(e) => changeInput("nombre", e.target.value, setInputs, inputs, setErrors, validate)} />
                                {errors.nombre && touched.nombre ? <FormError>{errors.nombre}</FormError> : null}

                            </div>
                            <div className="mt-3">
                                <Input label="Apellido" value={inputs.apellido}
                                    onBlur={() => touchInput("apellido", setTouched, touched)}

                                    onChange={(e) => changeInput("apellido", e.target.value, setInputs, inputs, setErrors, validate)} />

                                {errors.apellido && touched.apellido ? <FormError>{errors.apellido}</FormError> : null}
                            </div>
                            <div className="mt-3">
                                <Input label="Edad"
                                    onBlur={() => touchInput("edad", setTouched, touched)}
                                    value={inputs.edad} type="number" onChange={(e) => changeInput("username", e.target.value, setInputs, inputs, setErrors, validate)} />
                                {errors.edad && touched.edad ? <FormError>{errors.edad}</FormError> : null}
                            </div>
                            <div className="mt-3">
                                <Input label="Fecha de Nacimiento"
                                    onBlur={() => touchInput("fechaNacimiento", setTouched, touched)}
                                    value={inputs.fechaNacimiento} type="date" onChange={(e) => changeInput("fechaNacimiento", e.target.value, setInputs, inputs, setErrors, validate)} />
                                {errors.fechaNacimiento && touched.fechaNacimiento ? <FormError>{errors.fechaNacimiento}</FormError> : null}
                            </div>
                            <div className="mt-3">
                                <Input label="Ciudad"
                                    onBlur={() => touchInput("ciudad", setTouched, touched)}
                                    value={inputs.ciudad} onChange={(e) => changeInput("ciudad", e.target.value, setInputs, inputs, setErrors, validate)} />
                                {errors.ciudad && touched.ciudad ? <FormError>{errors.ciudad}</FormError> : null}

                            </div>
                            <div className="mt-3">
                                <Input label="Teléfono"
                                    onBlur={() => touchInput("telefono", setTouched, touched)}
                                    value={inputs.telefono} onChange={(e) => changeInput("telefono", e.target.value, setInputs, inputs, setErrors, validate)} />
                                {errors.telefono && touched.telefono ? <FormError>{errors.telefono}</FormError> : null}
                            </div>
                            <div className="mt-3">
                                <Select variant="outlined"
                                    onBlur={() => touchInput("genero", setTouched, touched)}
                                    label="Género" value={inputs.genero} onChange={(value) =>
                                        changeInput("genero", value ?? "", setInputs, inputs, setErrors, validate)
                                    }>
                                    <Option value="1">Masculino</Option>
                                    <Option value="0">Femenino</Option>
                                    <Option value="-1">Indefinido</Option>
                                </Select>
                                {errors.genero && touched.genero ? <FormError>{errors.genero}</FormError> : null}
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


