import { useState } from 'react';

export const useForm = <T extends Record<string, any>>(initialState: T) => {
  const [values, setValues] = useState(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues(prevValues => ({ ...prevValues, [name]: value }));
  };

  return { values, handleChange, setValues };
};
