import InputFieldModel from "../Models/InputFieldModel";
import {initialValuesModel} from "../Models/InputFieldModel";
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../firebase/config';

 
   async function validateEmailSignUp(value: string){
     let error ="";
     if (!value) {
       error = "Email is required";
     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
       error = "Invalid email address";
     }else{
       const err = await fetchSignInMethodsForEmail(auth, value)
       if(err?.length !== 0) {
         error = "Email already registered"
       }
     }
     return error;
   }
   
   async function  validateEmailDoesNotExist(value: string) {
       let error ="";
     if (!value) {
       error = "Email is required";
     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
       error = "Invalid email address";
     }else{
       const err = await  fetchSignInMethodsForEmail(auth, value)
       if(err?.length === 0) {
         error = "Email is not registered"
       }
     }
     return error
     
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
    validation: validateEmailDoesNotExist,
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
    Error: {
        name: "firstName",
        component: "div",
    }
  },
  {
    id: 2,
    name: "lastName",
    placeholder: "Last Name",
    type: undefined,
    validation: validateName,
    Error: {
        name: "lastName",
        component: "div",
    }
  },
  {
    id: 3,
    name: "email",
    placeholder: "Email",
    type: "email",
    validation: validateEmailSignUp,
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

const forgotPassFields = [
    {
        id: 1,
        name: "email",
        placeholder: "Email",
        type: "email",
        validation: validateEmailDoesNotExist,
        Error: {
            name: "email",
            component: "div",
        }
    }]

const initialValuesLogin: initialValuesModel = {
  email:"",
  password:""
}

const intialValuesForgotPass: any = {email:""}

const initialValuesSignUp: initialValuesModel = {
    firstName:"",
    lastName:"",
    email:"",
    password:""
}


export { LoginFields, SignUpFields, initialValuesLogin, initialValuesSignUp, forgotPassFields, intialValuesForgotPass };
