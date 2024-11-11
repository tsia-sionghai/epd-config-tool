import { useState, ChangeEvent } from 'react';

export const useForm = <T extends Record<string, string | number | boolean>>(initialState: T) => {
  const [values, setValues] = useState<T>(initialState);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  return { values, handleChange, setValues };
};
