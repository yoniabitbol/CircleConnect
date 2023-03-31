import InputFieldModel from "../Models/InputFieldModel";
import {initialValuesModel} from "../Models/InputFieldModel";
import { fetchSignInMethodsForEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import i18n from "../i18n/i18n";

    async function validateEmailSignUp(value: string){
     let error ="";
     if (!value) {
       error = i18n.t('loginAndRegistration.label.emailRequired');
     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
       error = i18n.t('loginAndRegistration.label.invalidEmail');
     }else{
       const err = await fetchSignInMethodsForEmail(auth, value)
       if(err?.length !== 0) {
         error = i18n.t('loginAndRegistration.label.emailRegistered');
       }
     }
     return error;
   }
   
   async function  validateEmailDoesNotExist(value: string) {
       let error ="";
     if (!value) {
       error = i18n.t('loginAndRegistration.label.emailRequired');
     } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
       error =i18n.t('loginAndRegistration.label.invalidEmail');
     }else{
       const err = await  fetchSignInMethodsForEmail(auth, value)
       if(err?.length === 0) {
         error = i18n.t('loginAndRegistration.label.emailNotRegistered');
       }
     }
     return error
     
   }
   
   

    function validatePassword(value: string) {
        let error ="";
        if (!value) {
            error = i18n.t('loginAndRegistration.label.passwordRequired');
        } else if (value.length < 8) {
            error = i18n.t('loginAndRegistration.label.passwordLength');
        }
        return error;
    }
    function validateName(value: string) {
        let error ="";
        if (!value) {
            error =  i18n.t('loginAndRegistration.label.nameIsRequired');
        } else if (value.length < 3) {
            error = i18n.t('loginAndRegistration.label.nameLength');
        }
        return error;
    }
const LoginFields: InputFieldModel[] = [
  {
    id: 1,
    name: "email",
    placeholder: i18n.t('loginAndRegistration.label.email'),
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
    placeholder: i18n.t('loginAndRegistration.label.password'),
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
    placeholder: i18n.t('loginAndRegistration.label.firstName'),
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
    placeholder: i18n.t('loginAndRegistration.label.lastName'),
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
    placeholder: i18n.t('loginAndRegistration.label.email'),
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
    placeholder:  i18n.t('loginAndRegistration.label.password'),
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
        placeholder:  i18n.t('loginAndRegistration.label.email'),
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
