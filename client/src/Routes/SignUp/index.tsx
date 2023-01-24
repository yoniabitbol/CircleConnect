import React from "react";
import SubmissionForm from "../../components/SubmissionForm";
import AuthContent from "../../components/AuthContent";
import { SignUpFields } from "../../lib/InputFieldModels";
import useSignup from "../../hooks/useSignup";
const SignUp: React.FC = () => {
    const { error, signup } = useSignup();
    const onSubmitHandler = (values: any) => {
        signup(values.email, values.password, values.firstName, values.lastName)
            .catch((err) => {
            console.log('Response:', err);
        })
    }

  return (
    <div className="lg:flex justify-center lg:text-left text-center">
      <AuthContent />
      <SubmissionForm
        error={error}
        header="Sign up"
        fields={SignUpFields}
        buttonField="Register"
        onSubmit={onSubmitHandler}
      />

      <div className="hidden lg:block lg:absolute lg:left-1/3 lg:bottom-40">
        <img className="h-96" src="Mascot/img.png" alt="logo" />
      </div>
    </div>
  );
};

export default SignUp;
