import React from 'react';
import SubmissionForm from "../../components/SubmissionForm";
import useForgotPassword from "../../hooks/useForgotPassword";
import AuthContent from "../../components/AuthContent";
import {intialValuesForgotPass, forgotPassFields} from "../../lib/InputFieldModels";
import {useState} from "react";
import {Link} from "react-router-dom";
const ForgotPass: React.FC = () => {
    const { error, forgotPassword } = useForgotPassword();
  const [showEmailSent, setShowEmailSent] = useState(false);
    const onSubmitHandler = (values: any) => {
        forgotPassword(values.email);
        setShowEmailSent(true);
        if(error) {
            throw new Error(error)
        }
    }
    
    
    return (
        <div className="lg:flex justify-center lg:text-left text-center">
          {!showEmailSent ? <>
            <AuthContent />
            <SubmissionForm
              onSubmit={onSubmitHandler}
              header="Forgot Password"
              fields={forgotPassFields}
              buttonField="Reset"
              initialValues={intialValuesForgotPass}
            />
            <div className="hidden lg:block lg:absolute lg:left-1/3 lg:bottom-40">
              <img className="h-96" src="Mascot/img.png" alt="logo" />
            </div>
            
          </> : <div className="justify-center text-center">
            <h1 className="text-4xl font-bold">Check your E-mail!</h1>
            <br/>
            <h2 className="text-2xl font-medium mt-3">A password reset link has been sent</h2>
            <br/>
            <Link className="text-blue-500 text-2xl" to='/login'>Login Here</Link>
          </div>}
        </div>
    );
};

export default ForgotPass;
