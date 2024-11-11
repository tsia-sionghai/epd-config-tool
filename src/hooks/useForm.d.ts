import { ChangeEvent } from 'react';

export declare const useForm: <T extends Record<string, string | number | boolean>>(
  initialState: T
) => {
  values: T;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setValues: import("react").Dispatch<import("react").SetStateAction<T>>;
};
