import React from "react";
import Input, { InputProps } from '@mui/material/Input';
import { UseFormRegister, FieldError } from "react-hook-form";

type InputFieldProps = InputProps & {
    register: UseFormRegister<any>;
    name: string;
    errorForm?: FieldError;
    styleError?: React.CSSProperties | undefined
}

const InputComponent: React.FC<InputFieldProps> = ({
    register,
    name,
    errorForm,
    styleError: style,
    ...props
}) => {
    return (
        <>
            <Input {...register(name)} {...props} />
            {errorForm && <p style={style}>{errorForm.message}</p>}
        </>
    );
};

export default InputComponent;
