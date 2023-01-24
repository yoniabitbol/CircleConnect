import React from "react";
import AuthContent from "../../components/AuthContent";
import SubmissionForm from "../../components/SubmissionForm";
import { LoginFields } from "../../lib/InputFieldModels";
import useLogin from '../../hooks/useLogin';


const Login: React.FC = () => {
  const {error, login} = useLogin();

    const onSubmitHandler = (values: any) => {
      login(values.email, values.password)
    }
  return (
    <div className="lg:flex justify-center lg:text-left text-center">
      <AuthContent />
      <SubmissionForm 
        error={error} 
        onSubmit={onSubmitHandler} 
        header="Login" 
        fields={LoginFields} 
        buttonField="Login" 
      />
      <div className="hidden lg:block lg:absolute lg:left-1/3 lg:bottom-40">
        <img className="h-96" src="Mascot/img.png" alt="logo" />
      </div>
    </div>
  );
};

export default Login;
