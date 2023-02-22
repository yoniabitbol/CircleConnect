import React from "react";
import { Field } from "formik";

const Summary: React.FC<{
  summary: string;
  edit: boolean;
}> = ({ summary, edit }) => {
  return (
    <div>
      {edit ? (
        <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
          <h1 className="text-2xl font-bold ">About</h1>
          <div className="w-2/3 mx-auto pt-5">
            <label className="text-sm font-semibold text-gray-600 py-2">
              Summary
            </label>
            <Field
              as="textarea"
              name="summary"
              className="w-full rounded-sm"
              type="text"
            />
          </div>
        </div>
      ) : (
        <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
          <h1 className="text-2xl font-bold ">About</h1>
          {summary == "undefined" || summary === ""
            ? "Add a summary!"
            : summary}
        </div>
      )}
    </div>
  );
};

export default Summary;
