export declare const useForm: <T extends Record<string, any>>(initialState: T) => {
    values: T;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    setValues: import("react").Dispatch<import("react").SetStateAction<T>>;
};
