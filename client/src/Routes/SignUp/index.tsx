import React from "react";
import SubmissionForm from "../../components/SubmissionForm";
import AuthContent from "../../components/AuthContent";
import { SignUpFields } from "../../lib/InputFieldModels";

const SignUp: React.FC = () => {
  return (
    <div className="lg:flex justify-center lg:text-left text-center">
      <AuthContent />
      <SubmissionForm
        header="Sign up"
        fields={SignUpFields}
        buttonField="Register"
      />

      <div className="hidden lg:block lg:absolute lg:left-1/3 lg:bottom-40">
        <img className="h-96" src="Maskot/img.png" alt="logo" />
      </div>
    </div>
  );
};

export default SignUp;
