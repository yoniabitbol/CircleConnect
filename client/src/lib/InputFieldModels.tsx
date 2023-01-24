import InputFieldModel from "../Models/InputFieldModel";
import {initialValuesModel} from "../Models/InputFieldModel"

function validateEmail(value: string) {
  let error ="";
  if (!value) {
    error = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
    error = "Invalid email address";
  }
    return error;
   }
   
    function validatePassword(value: string) {
        let error ="";
        if (!value) {
            error = "Password is required";
        } else if (value.length < 8) {
            error = "Password must be at least 8 characters";
        }
        return error;
    }
    function validateName(value: string) {
        let error ="";
        if (!value) {
            error = "Name is required";
        } else if (value.length < 3) {
            error = "Name must be at least 3 characters";
        }
        return error;
    }
const LoginFields: InputFieldModel[] = [
  {
    id: 1,
    name: "email",
    placeholder: "Email",
    type: "email",
    validation: validateEmail,
    Error: {
      name: "email",
      component: "div",
    },
  },
  {
    id: 2,
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: validatePassword,
    Error: {
      name: "password",
      component: "div",
    },
  },
];

const SignUpFields: InputFieldModel[] = [
  {
    id: 1,
    name: "firstName",
    placeholder: "First Name",
    type: undefined,
    validation: validateName,
    Error: undefined,
  },
  {
    id: 2,
    name: "lastName",
    placeholder: "Last Name",
    type: undefined,
    validation: validateName,
    Error: undefined,
  },
  {
    id: 3,
    name: "email",
    placeholder: "Email",
    type: "email",
    validation: validateEmail,
    Error: {
      name: "email",
      component: "div",
    },
  },
  {
    id: 4,
    name: "password",
    placeholder: "Password",
    type: "password",
    validation: validatePassword,
    Error: {
      name: "password",
      component: "div",
    },
  },
];

const initialValuesLogin: initialValuesModel = {
  email:"",
  password:""
}

const initialValuesSignUp: initialValuesModel = {
    firstName:"",
    lastName:"",
    email:"",
    password:""
}


export { LoginFields, SignUpFields, initialValuesLogin, initialValuesSignUp };
