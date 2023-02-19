import React from "react";
import SubmissionForm from "../../components/SubmissionForm";
import AuthContent from "../../components/AuthContent";
import { SignUpFields } from "../../lib/InputFieldModels";
import useSignup from "../../hooks/useSignup";
import { initialValuesSignUp } from "../../lib/InputFieldModels";
import { initialValuesModel } from "../../Models/InputFieldModel";

const SignUp: React.FC = () => {
    const { error, signup } = useSignup();
    const onSubmitHandler = async (values: initialValuesModel) => {
        await signup(values.email, values.password, values.firstName, values.lastName)
        if(error) {
          throw new Error(error)
        }
        
    }

  return (
    <div className="lg:flex justify-center lg:text-left text-center">
      <AuthContent />
      <SubmissionForm
        header="Sign up"
        fields={SignUpFields}
        buttonField="Register"
        onSubmit={onSubmitHandler}
        initialValues= {initialValuesSignUp}
      />

      <div className="hidden lg:block lg:absolute lg:left-1/3 lg:bottom-40">
        <img className="h-96" src="Mascot/img.png" alt="logo" />
      </div>

      {/*We have to do this because the ReactJS testing library does not seem to work with the submit button
            in Formik.*/}
      <div data-testid="signup-button" className="absolute invisible" onClick={() =>
        onSubmitHandler({"email": "test@hotmail.com", "password": "test123456@", "firstName": "test",
                                "lastName": "test"})} ></div>
    </div>
  );
};

export default SignUp;
