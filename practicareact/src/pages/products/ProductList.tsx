import { useEffect, useState } from "react";
import { ProductService } from "../../services/ProductService";
import { Producto } from "../../models/Producto";
import { Routes } from "../../routes/CONSTANTS";
import { Button, Card, CardBody, CardHeader } from "@material-tailwind/react";
import TailwindLink from "../../components/TailwindLink";
import NavMenu from "../../components/NavMenu";

const ProductList = () => {
    const [productList, setProductList] = useState<Producto[]>([])
    useEffect(() => {
        fetchProductList()
    }, [])

    const fetchProductList = () => {
        ProductService.list().then((response) => {
            setProductList(response);
        }).catch((error) => {
            console.log(error);
        });
    }
    function deleteProduct(id?: number) {
        if (!id) {
            return;
        }
        ProductService.delete(id).then(() => {
            fetchProductList();
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
                            <h1 className="text-3xl font-bold">Lista de Productos</h1>

                        </CardHeader>
                        <table className="w-full min-w-max table-auto text-left">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre</th>
                                    <th>Descripcion</th>
                                    <th>Precio</th>
                                    <th>Cantidad</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {productList.map((product: Producto) =>
                                    <tr className="even:bg-blue-gray-50/50" key={"product" + product.id}>
                                        <td>{product.id}</td>
                                        <td>{product.nombre}</td>
                                        <td>{product.descripcion}</td>
                                        <td>{product.precio}</td>
                                        <td>{product.cantidad}</td>
                                        <td>
                                            <TailwindLink text="Editar" to={Routes.PRODUCTS.EDIT_PARAM(product.id)} />
                                        </td>
                                        <td>
                                            <Button size="sm" color="red"
                                                onClick={() => {
                                                    deleteProduct(product.id)
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

export default ProductList;