import React from 'react';
interface FormFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    placeholder?: string;
    inputRef?: React.Ref<HTMLInputElement>;
}
declare const FormField: React.FC<FormFieldProps>;
export default FormField;
