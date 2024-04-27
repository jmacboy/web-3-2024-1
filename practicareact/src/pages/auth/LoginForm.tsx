import { useState } from "react";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";

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

    return (<form onSubmit={onLoginFormSubmit}>
        <div>
            <label>Email</label>
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
            <label>Contraseña</label>
            <input value={password}
                onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
            <button>Guardar</button>
        </div>

    </form>);
}

export default LoginForm;