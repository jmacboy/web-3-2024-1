import { Button, Menu, MenuHandler, MenuItem, MenuList, Navbar, Typography } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { Routes } from '../routes/CONSTANTS';

const NavMenu = () => {
    const navigate = useNavigate();
    const navList = (
        <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
            <Typography
                as="li"
                variant="small"
                className="p-1 font-normal"
            >
                <Menu>
                    <MenuHandler>
                        <Typography className="cursor-pointer">Clientes</Typography>
                    </MenuHandler>
                    <MenuList>
                        <MenuItem><Link to={Routes.CLIENTS.LIST}>Lista de Clientes</Link></MenuItem>
                        <MenuItem><Link to={Routes.CLIENTS.CREATE}>Crear Cliente</Link></MenuItem>
                    </MenuList>
                </Menu>
            </Typography>
        </ul>
    );
    return (<Navbar variant="gradient" color="blue-gray" className="from-blue-gray-900 to-blue-gray-800  sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-white ">
            <Typography
                as="a"
                href="#"
                className="mr-4 cursor-pointer py-1.5 font-medium"
            >
                Material Tailwind
            </Typography>
            <div className="flex items-center gap-4">
                <div className="mr-4 hidden lg:block">{navList}</div>
                <div className="flex items-center gap-x-1">

                    <Button
                        variant="gradient"
                        size="sm"
                        onClick={() => {
                            localStorage.removeItem('access_token');
                            localStorage.removeItem('refresh_token');
                            navigate(Routes.AUTH.LOGIN);
                        }}
                        className="hidden lg:inline-block"
                    >
                        <span>Cerrar sesión</span>
                    </Button>
                </div>
            </div>
        </div>
    </Navbar>);
}

export default NavMenu;