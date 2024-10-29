import { useState } from 'react';
export const useForm = (initialState) => {
    const [values, setValues] = useState(initialState);
    const handleChange = (event) => {
        const { name, value } = event.target;
        setValues(prevValues => ({ ...prevValues, [name]: value }));
    };
    return { values, handleChange, setValues };
};
