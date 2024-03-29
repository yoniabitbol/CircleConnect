import React from "react";
import { Formik, Form} from "formik";
import inputFieldModel, { initialValuesModel } from "../../Models/InputFieldModel";
import InputField from "./InputField";
import {useLocation} from "react-router-dom";
import { useTranslation } from "react-i18next";


import ThirdPartyLogin from "./ThirdPartyLogin";
import { Link } from "react-router-dom";


const SubmissionForm: React.FC<{
  fields: inputFieldModel[];
  header: string;
  buttonField: string;
  onSubmit: (values: initialValuesModel) => void;
  initialValues: initialValuesModel;
  error?: any;
}> = (props) => {
  const {t} = useTranslation();
  const { fields, header, buttonField,  initialValues, onSubmit, error } = props;
  const location = useLocation();
  return (
    <div className="lg:w-1/2 lg:mt-0 mt-20">
      <div className="lg:w-1/2 w-2/3 mx-auto">
        <h1 className="text-3xl font-medium">{header}</h1>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
          validateOnChange={false}
          validateOnBlur={false}
        >
          <Form className=" ">
            {fields.map((field) => (
              <InputField
                key={field.id}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                Error={field.Error}
                validation={field.validation}
              />
            ))}
            {location.pathname === '/login' && <Link data-testid="forgot-pass" to="/forgot" className="text-blue-500">{t('loginAndRegistration.buttons.forgotPassword')}</Link>}
            <button
              type="submit"
              className="block mt-4 w-full px-2 py-3 rounded-lg bg-signup-button
               text-white hover:bg-signup-button-hover shadow-xl shadow-placeholder-purple"
            >
              {buttonField}
            </button>
            {error && <div className="text-red-400 my-4 text-center text-xl">{t('loginAndRegistration.label.invalidPassword')}</div>}
          </Form>
        </Formik>
        {(location.pathname === '/signup' || location.pathname === '/login') && <ThirdPartyLogin />}
      </div>
    </div>
  );
};

export default SubmissionForm;