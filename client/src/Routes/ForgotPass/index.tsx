import React from 'react';
import SubmissionForm from "../../components/SubmissionForm";
import useForgotPassword from "../../hooks/useForgotPassword";
import AuthContent from "../../components/AuthContent";
import {intialValuesForgotPass, forgotPassFields} from "../../lib/InputFieldModels";

const ForgotPass: React.FC = () => {
    const { error, forgotPassword } = useForgotPassword();
    const onSubmitHandler = (values: any) => {
        forgotPassword(values.email);
        if(error) {
            throw new Error(error)
        }
    }
    return (
        <div className="lg:flex justify-center lg:text-left text-center">
            <AuthContent />
            <SubmissionForm
                onSubmit={onSubmitHandler}
                header="Forgot Password"
                fields={forgotPassFields}
                buttonField="Login"
                initialValues={intialValuesForgotPass}
            />
            <div className="hidden lg:block lg:absolute lg:left-1/3 lg:bottom-40">
                <img className="h-96" src="Mascot/img.png" alt="logo" />
            </div>
        </div>
    );
};

export default ForgotPass;
