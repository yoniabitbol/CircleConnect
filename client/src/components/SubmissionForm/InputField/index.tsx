import React from "react";
import { Field, ErrorMessage } from "formik";
import { ErrorModel } from "../../../Models/InputFieldModel";
import {useState} from 'react';

const InputField: React.FC<{
  type: string | undefined;
  name: string;
  placeholder: string;
  Error: ErrorModel | undefined;
  // validation: (value: string) => string;
    // isFormSubmitted: boolean;
}> = (props) => {
  const { type, name, placeholder, Error  } = props;
  const [inputValue, setInputValue] = useState("");
  // const [isTouched, setIsTouched] = useState(false);
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // setIsTouched(false)
    setTimeout(() => {
      if(e.target.value.length > 0) {
        // setIsTouched(true);
      }
    }, 2000);
  }
  
  
 
  return (
    <div>
      <Field
        className="block mt-4 w-full px-2 py-3 rounded-lg bg-input-purple placeholder-placeholder-purple"
        type={type}
        name={name}
        placeholder={placeholder}
        value={inputValue}
        // validate={validation(inputValue)}
        onChange={onChangeHandler}
        // onBlur={() => setIsTouched(true)}
      />
      {/* {( isTouched) && <div className="text-red-400">{validation(inputValue)}</div>} */}
      {Error && <ErrorMessage name={Error.name} component={Error.component} />}
    </div>
  );
};

export default InputField;
