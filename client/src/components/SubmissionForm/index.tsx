import React from "react";
import { Formik, Form} from "formik";
import inputFieldModel from "../../Models/InputFieldModel";
import InputField from "./InputField";

import ThirdPartyLogin from "./ThirdPartyLogin";

// this needs to be dynamic or imported from a file
// interface Values {
//   fname: string;
//   lname: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

const SubmissionForm: React.FC<{
  error: string | null;
  fields: inputFieldModel[];
  header: string;
  buttonField: string;
  onSubmit: (values: any, actions: any) => void;
}> = (props) => {
  const { fields, header, buttonField, onSubmit } = props;
  // const onSubmitHandler = () => {(
  //   values: Values,
  //   { setSubmitting }: FormikHelpers<Values>
  // ) => {
  //   setTimeout(() => {
  //     alert(JSON.stringify(values, null, 2));
  //     setSubmitting(false);
  //   }, 500);
  // }}

  return (
    <div className="lg:w-1/2 lg:mt-0 mt-20">
      <div className="lg:w-1/2 w-2/3 mx-auto">
        <h1 className="text-3xl font-medium">{header}</h1>
        <Formik
          onSubmit={onSubmit}

          // Frontend validation needs to be added to lib folder and imported here

          // These also need to be dynamic
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
        >
          <Form className=" ">
            {fields.map((field) => (
              <InputField
                key={field.id}
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                Error={field.Error}
              />
            ))}
            <button
              type="submit"
              className="block mt-4 w-full px-2 py-3 rounded-lg bg-signup-button
               text-white hover:bg-signup-button-hover shadow-xl shadow-placeholder-purple"
            >
              {buttonField}
            </button>
          </Form>
        </Formik>
        <ThirdPartyLogin />
      </div>
    </div>
  );
};

export default SubmissionForm;
