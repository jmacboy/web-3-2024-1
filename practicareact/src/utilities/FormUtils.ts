
import { Dispatch, SetStateAction } from 'react';
export type Inputs<T> = { [K in keyof T]: string };
export type Errors<T> = Partial<{ [K in keyof T]: string }>;
export type Touched<T> = Partial<{ [K in keyof T]: boolean }>;

export const touchInput = (property: string, setTouched: (value: object) => void, touched: object) => {
    setTouched({ ...touched, [property]: true })
}
export const changeInput = <T>(
    property: keyof T,
    value: string,
    setInputs: Dispatch<SetStateAction<T>>,
    inputs: T,
    setErrors: (value: Errors<T>) => void,
    validate: (value: Inputs<T>) => Errors<T>
): void => {
    setInputs({ ...inputs, [property]: value })
    setErrors(
        validate({ ...inputs, [property]: value })
    )
}