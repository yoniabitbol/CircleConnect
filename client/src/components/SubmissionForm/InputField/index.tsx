import React from "react";
import { Field, ErrorMessage } from "formik";
import { ErrorModel } from "../../../Models/InputFieldModel";
// import {useState} from 'react';

const InputField: React.FC<{
  type: string | undefined;
  name: string;
  placeholder: string;
  Error: ErrorModel;
  validation: (value : string) => string;
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
      {Error && <ErrorMessage className="text-red-400" name={Error.name} component={Error.component} />}
    </div>
  );
};

export default InputField;
