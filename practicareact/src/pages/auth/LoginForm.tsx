import { useState } from "react";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";
import { Button, Card, CardBody, CardHeader, Input, Typography } from "@material-tailwind/react";

const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const doLogin = () => {
        AuthService.login({ username: email, password: password })
            .then(response => {
                localStorage.setItem('access_token', response.access);
                localStorage.setItem('refresh_token', response.refresh);
                navigate(Routes.CLIENTS.LIST);
            })
    }
    const onLoginFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        doLogin();
    }

    return (
        <div className="flex justify-center items-center w-screen h-screen">
            <Card className="w-2/4">
                <CardBody>
                    <CardHeader color="transparent" shadow={false} >
                        <Typography variant="h4" color="blue-gray">
                            Iniciar sesión
                        </Typography>
                    </CardHeader>
                    <form onSubmit={onLoginFormSubmit}>
                        <div className="mt-3">
                            <Input label="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <Input label="Contraseña" value={password} type="password"
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mt-3">
                            <Button type="submit">Iniciar Sesión</Button>
                        </div>
                    </form>
                </CardBody>
            </Card>
        </div>);
}

export default LoginForm;