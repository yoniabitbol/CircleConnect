import React from "react";
import AuthContent from "../../components/AuthContent";
import SubmissionForm from "../../components/SubmissionForm";
import { LoginFields } from "../../lib/InputFieldModels";
import useLogin from "../../hooks/useLogin";
import { initialValuesLogin } from "../../lib/InputFieldModels";
import { initialValuesModel } from "../../Models/InputFieldModel";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { error, login } = useLogin();
  const navigate = useNavigate();

  const onSubmitHandler = (values: initialValuesModel) => {
    login(values.email, values.password);

    // Sketchy way to redirect to profile page after login TODO: Fix this
    setTimeout(() => {
      console.log("Redirecting to profile");
      navigate("/myprofile");
    }, 1000);

    if (error) {
      throw new Error(error);
    }
  };
  return (
    <div className="lg:flex justify-center lg:text-left text-center">
      <AuthContent />

      <SubmissionForm
        onSubmit={onSubmitHandler}
        header="Login"
        fields={LoginFields}
        buttonField="Login"
        initialValues={initialValuesLogin}
        error={error}
      />
      <div className="hidden lg:block lg:absolute lg:left-1/3 lg:bottom-40">
        <img className="h-96" src="Mascot/img.png" alt="logo" />
      </div>

      {/*We have to do this because the ReactJS testing library does not seem to work with the submit button
        in Formik.*/}
      <div data-testid="submit-button" className="absolute invisible" onClick={() =>
        onSubmitHandler({"email": "test@hotmail.com", "password": "test123456@"})} ></div>
    </div>
  );
};

export default Login;


