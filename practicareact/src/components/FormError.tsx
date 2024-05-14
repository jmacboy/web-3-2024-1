import { Typography } from "@material-tailwind/react";
type Props = {
    children: string
}
const FormError = ({ children }: Props) => {
    return (
        <Typography color="red" className="mt-1 font-small">{children}</Typography>
    );
}

export default FormError;