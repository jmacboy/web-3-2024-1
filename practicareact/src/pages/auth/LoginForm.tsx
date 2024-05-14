import { FormEvent, useState } from "react";
import { AuthService } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { Routes } from "../../routes/CONSTANTS";
import { Button, Card, CardBody, CardHeader, Input, Typography } from "@material-tailwind/react";
import useUserInfo from "../../hooks/useUserInfo";
import FormError from "../../components/FormError";
import { changeInput, touchInput } from "../../utilities/FormUtils";

const LoginForm = () => {
    const navigate = useNavigate();
    const validate = (newInputs: Inputs): Errors => {
        const newErrors: Errors = {}

        if (!newInputs.email) {
            newErrors.email = "Ingrese un email válido."
        }
        if (!newInputs.password) {
            newErrors.password = "Ingrese una contraseña válida."
        }

        return newErrors
    }

    type Inputs = { email: string, password: string }
    const [inputs, setInputs] = useState<Inputs>({ email: "", password: "" })

    type Errors = Partial<Record<keyof Inputs, string>>
    const [errors, setErrors] = useState<Errors>(validate(inputs))

    type Touched = Partial<Record<keyof Inputs, boolean>>
    const [touched, setTouched] = useState<Touched>({})


    const { getUserInfo } = useUserInfo();
    const doLogin = () => {
        AuthService.login({ username: inputs.email, password: inputs.password })
            .then(() => {
                getUserInfo();
                navigate(Routes.CLIENTS.LIST);
            })
    }


    const onLoginFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const validatedErrors = validate(inputs);
        setErrors(validatedErrors);
        setTouched(Object.keys(inputs).reduce((acc, key) => ({ ...acc, [key]: true }), {} as Touched));
        const isValid = Object.keys(errors).length === 0;

        if (!isValid) {
            return;
        }

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
                    <form noValidate onSubmit={onLoginFormSubmit}>
                        <div className="mt-3">
                            <Input label="Email"
                                value={inputs.email}
                                onBlur={() => touchInput("email", setTouched, touched)}
                                onChange={(e) => {
                                    changeInput("email", e.target.value, setInputs, inputs, setErrors, validate)
                                }} />
                            {errors.email && touched.email ? <FormError>{errors.email}</FormError> : null}
                        </div>
                        <div className="mt-3">
                            <Input label="Contraseña" value={inputs.password} type="password"
                                onBlur={() => touchInput("password", setTouched, touched)}
                                onChange={(e) => {
                                    changeInput("password", e.target.value, setInputs, inputs, setErrors, validate)
                                }} />
                            {errors.password && touched.password ? <FormError>{errors.password}</FormError> : null}
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