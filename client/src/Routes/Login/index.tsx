import React from "react";
import AuthContent from "../../components/AuthContent";
import SubmissionForm from "../../components/SubmissionForm";
import { LoginFields } from "../../lib/InputFieldModels";
// import useSignup from '../../hooks/useSignup';


const Login: React.FC = () => {
    const onSubmitHandler = (values: any, actions: any) => {
        console.log(values, actions);
    }
  return (
    <div className="lg:flex justify-center lg:text-left text-center">
      <AuthContent />
      <SubmissionForm error={'Hey fake error'} onSubmit={onSubmitHandler} header="Login" fields={LoginFields} buttonField="Login" />
      <div className="hidden lg:block lg:absolute lg:left-1/3 lg:bottom-40">
        <img className="h-96" src="Mascot/img.png" alt="logo" />
      </div>
    </div>
  );
};

export default Login;
