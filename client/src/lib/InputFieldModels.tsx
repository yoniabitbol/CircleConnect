import InputFieldModel from "../Models/InputFieldModel";

const LoginFields: InputFieldModel[] = [
  {
    id: 1,
    name: "email",
    placeholder: "Email",
    type: "email",
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
    Error: {
      name: "password",
      component: "div",
    },
  },
];

const SignUpFields: InputFieldModel[] = [
  {
    id: 1,
    name: "fname",
    placeholder: "First Name",
    type: undefined,
    Error: undefined,
  },
  {
    id: 2,
    name: "lname",
    placeholder: "Last Name",
    type: undefined,
    Error: undefined,
  },
  {
    id: 3,
    name: "email",
    placeholder: "Email",
    type: "email",
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
    Error: {
      name: "password",
      component: "div",
    },
  },
  {
    id: 5,
    name: "password2",
    placeholder: "Confirm password",
    type: "password",
    Error: undefined,
  },
];

export { LoginFields, SignUpFields };
