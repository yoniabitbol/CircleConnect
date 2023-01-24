export interface ErrorModel {
    name: string;
    component: string;
}
interface InputFieldModel {
    id: number;
    name: string;
    placeholder: string;
    type: string | undefined;
    
    validation: (value: string) => string;
    Error: ErrorModel;
}

export interface initialValuesModel {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
}

export default InputFieldModel;