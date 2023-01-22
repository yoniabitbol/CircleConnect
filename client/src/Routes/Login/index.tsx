import React from "react";
import AuthContent from "../../components/AuthContent";
import SubmissionForm from "../../components/SubmissionForm";
import InputFieldModel from "../../Models/InputFieldModel";

const Login: React.FC = () => {
  const fields : InputFieldModel[] = [
    {
      id: 1,
      name: 'email',
      placeholder: 'Email',
      type: 'email',
      Error: {
        name: 'emial',
        component: 'div'
      }
      
    },
    {
      id: 2,
      name: 'password',
      placeholder: 'Password',
      type: 'password',
      Error: {
        name: 'password',
        component: "div"
      }
    }
  ]
  
  return (
    <div className="flex justify-center">
      <AuthContent/>
      <div className="w-1/2">
        <div className="w-1/2 mx-auto">
          <SubmissionForm header='Login' fields={fields} buttonField='Login'/>
        </div>
      </div>
    </div>
  );
};

export default Login;