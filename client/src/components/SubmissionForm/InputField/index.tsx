import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { ErrorModel } from '../../../Models/InputFieldModel';

const InputField: React.FC<{ type: string | undefined, name:string, placeholder:string, Error: ErrorModel | undefined }> = (props) => {
  const { type, name, placeholder, Error } = props;
  return (
    <div>
      <Field className="block mt-4 w-full px-2 py-3 rounded-lg bg-input-purple placeholder-placeholder-purple" type={type} name={name} placeholder={placeholder} />
      {Error && <ErrorMessage name={Error.name} component={Error.component} />}
    </div>
  );
};

export default InputField;
