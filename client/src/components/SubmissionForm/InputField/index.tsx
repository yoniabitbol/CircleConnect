import React from "react";
import { Field, ErrorMessage } from "formik";
import { ErrorModel } from "../../../Models/InputFieldModel";
// import {useState} from 'react';

const InputField: React.FC<{
  type: string | undefined;
  name: string;
  placeholder: string;
  Error: ErrorModel | undefined;
  errors: any;
    touched: any;
  validation: any;
    // isFormSubmitted: boolean;
}> = (props) => {
  const { type, name, placeholder, Error,  validation  } = props;
  return (
    <div>
      <Field
        className="block mt-4 w-full px-2 py-3 rounded-lg bg-input-purple placeholder-placeholder-purple"
        type={type}
        name={name}
        placeholder={placeholder}
        validate={validation}
      />
      {Error && <div className="left-2/3"><ErrorMessage className="text-red-400" name={Error.name} component={Error.component} /></div>}
    </div>
  );
};

export default InputField;
