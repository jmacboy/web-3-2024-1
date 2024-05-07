import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";
import NavMenu from "../../components/NavMenu";
import { Button, Card, CardBody, CardHeader, Input, Option, Select, Typography } from "@material-tailwind/react";
import { ProductService } from "../../services/ProductService";

const ProductForm = () => {
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [precio, setPrecio] = useState('')
    const [cantidad, setCantidad] = useState('')
    const { id } = useParams();
    useEffect(() => {
        if (!id) { return; }
        fetchProductById();
    }, [id])
    const fetchProductById = () => {
        if (!id) return;
        ProductService.get(parseInt(id)).then((response) => {
            console.log(response);
            setNombre(response.nombre);
            setDescripcion(response.descripcion);
            setPrecio(response.precio);
            setCantidad(response.cantidad);
        }).catch((error) => {
            console.log(error);
        });
    }
    const onProductoFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (id) {
            updateProduct();
        } else {
            createProduct();
        }
    }
    const updateProduct = () => {
        if (!id) {
            return;
        }
        ProductService.update({
            id: parseInt(id),
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            descripcion: descripcion
        }).then((response) => {
            console.log(response);
            navigate(Routes.PRODUCTS.LIST);
        }).catch((error) => {
            console.log(error);
        });
    }

    const createProduct = () => {
        ProductService.create({
            nombre: nombre,
            precio: precio,
            cantidad: cantidad,
            descripcion: descripcion
        }).then((response) => {
            console.log(response);
            navigate(Routes.PRODUCTS.LIST);

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
                                Formulario de Producto
                            </Typography>
                        </CardHeader>

                        <form onSubmit={onProductoFormSubmit}>
                            <div className="mt-3">
                                <Input label="Nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <Input label="Descripcion" value={descripcion}
                                    onChange={(e) => setDescripcion(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <Input label="Precio" value={precio} type="number" onChange={(e) => setPrecio(e.target.value)} />
                            </div>
                            <div className="mt-3">
                                <Input label="Cantidad" value={cantidad} type="number" onChange={(e) => setCantidad(e.target.value)} />
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

export default ProductForm;


