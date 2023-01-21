export interface ErrorModel {
    name: string;
    component: string;
}
interface InputFieldModel {
    id: number;
    name: string;
    placeholder: string;
    type: string | undefined;
    Error: ErrorModel | undefined
}

export default InputFieldModel;