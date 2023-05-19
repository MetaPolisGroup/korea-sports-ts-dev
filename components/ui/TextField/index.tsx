import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { UseFormRegister, FieldError } from "react-hook-form";

type InputFieldProps = TextFieldProps & {
    register: UseFormRegister<any>;
    name: string;
    errorForm?: FieldError;
    styleError?: React.CSSProperties | undefined
}

const TextFieldComponent: React.FC<InputFieldProps> = ({
    register,
    name,
    errorForm,
    styleError: style,
    ...props
}) => {
    return (
        <>
            <TextField {...register(name)} {...props} />
            {errorForm && <p style={style}>{errorForm.message}</p>}
        </>
    );
};

export default TextFieldComponent;
