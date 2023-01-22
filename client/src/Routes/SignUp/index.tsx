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
      <div className="lg:flex justify-center lg:text-left text-center">

        <div className="relative lg:w-1/2">
          <div className="lg:flex lg:w-1/2 w-2/3 mx-auto h-full">
            <div className="my-auto">
              <AuthContent />
            </div>
          </div>

          <div className="hidden lg:block lg:absolute lg:-bottom-20 lg:-right-20">
            <img
                className="h-96"
                src="Maskot/img.png"
                alt="logo"
            />
          </div>

        </div>

        <div className="lg:w-1/2 lg:mt-0 mt-20">
          <div className="lg:w-1/2 w-2/3 mx-auto">
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
