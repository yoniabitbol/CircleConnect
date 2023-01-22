import React from 'react';
import { Formik, Form } from 'formik';
import inputFieldModel from '../../Models/InputFieldModel';
import InputField from './InputField';
import classes from './style.module.css';
import ThirdPartyLogin from "./ThirdPartyLogin";

const SubmissionForm:React.FC<{ fields: inputFieldModel[], header:string, buttonField:string }> = (props) => {
  const { fields, header, buttonField } = props;
  const onSubmitHandler = () => {
    console.log('test')
  };
  return (
    <div className={classes.form}>
      <h1 className="text-3xl font-medium">{header}</h1>
      <Formik
        onSubmit={onSubmitHandler}
        initialValues={{
          fname: '',
          lname: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
      >
        <Form className=" ">
          {fields.map((field) =>
              <InputField key={field.id} type={field.type}
                                     name={field.name} placeholder={field.placeholder} Error={field.Error}/>
                    )}
                    <button type='submit' className="block mt-4 w-full px-2 py-3 rounded-lg bg-signup-button text-white hover:bg-signup-button-hover shadow-xl shadow-placeholder-purple">{buttonField}</button>
                </Form>
            </Formik>
          <ThirdPartyLogin/>
        </div>
    );
};

export default SubmissionForm;