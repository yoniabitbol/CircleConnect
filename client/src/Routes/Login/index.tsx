import React from "react";
import AuthContent from "../../components/AuthContent";
import SubmissionForm from "../../components/SubmissionForm";
import { LoginFields } from "../../lib/InputFieldModels";
import useLogin from '../../hooks/useLogin';
import { initialValuesLogin } from "../../lib/InputFieldModels";
import {initialValuesModel} from "../../Models/InputFieldModel";


const Login: React.FC = () => {
  const { error, login } = useLogin();

    const onSubmitHandler = (values: initialValuesModel) => {
      login(values.email, values.password);
      if(error) {
        throw new Error(error)
      }
    }
  return (
    <div className="lg:flex justify-center lg:text-left text-center">
      <AuthContent />
      
      <SubmissionForm
        onSubmit={onSubmitHandler}
        header="Login"
        fields={LoginFields}
        buttonField="Login"
        initialValues={initialValuesLogin}
      />
      <div className="hidden lg:block lg:absolute lg:left-1/3 lg:bottom-40">
        <img className="h-96" src="Mascot/img.png" alt="logo" />
      </div>
    </div>
  );
};

export default Login;
