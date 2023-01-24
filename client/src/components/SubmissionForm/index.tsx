import React from "react";
import { Formik, Form} from "formik";
import inputFieldModel, { initialValuesModel } from "../../Models/InputFieldModel";
import InputField from "./InputField";

import ThirdPartyLogin from "./ThirdPartyLogin";

const SubmissionForm: React.FC<{
  fields: inputFieldModel[];
  header: string;
  buttonField: string;
  onSubmit: (values: initialValuesModel) => void;
  initialValues: initialValuesModel;
}> = (props) => {
  const { fields, header, buttonField,  initialValues, onSubmit } = props;
  return (
    <div className="lg:w-1/2 lg:mt-0 mt-20">
      <div className="lg:w-1/2 w-2/3 mx-auto">
        <h1 className="text-3xl font-medium">{header}</h1>
        <Formik
          onSubmit={onSubmit}
          initialValues={initialValues}
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
