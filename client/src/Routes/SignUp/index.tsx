import React from "react";
import InputFieldModel from "../../Models/InputFieldModel";
import SubmissionForm from "../../components/SubmissionForm";
import AuthContent from "../../components/AuthContent";

const SignUp: React.FC = () => {
  const fields: InputFieldModel[] = [
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
  return (
    <div>
      <div className="flex justify-center">
        <AuthContent />
        <div className="w-1/2">
          <div className="w-1/2 mx-auto">
            <SubmissionForm
              header="Sign up"
              fields={fields}
              buttonField="Register"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
