// Render Prop
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const SignupForm = () => (
  <div className=" ">
    <h1 className="text-3xl font-medium">Signup</h1>
    <Formik
      initialValues={{
        fname: "",
        lname: "",
        email: "",
        password: "",
        password2: "",
      }}
      validate={(values) => {
        const errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = "Invalid email address";
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="">
          <Field
            className="block mt-4 w-full px-2 py-3 rounded-lg bg-input-purple placeholder-placeholder-purple"
            name="fname"
            placeholder="First Name"
          />
          <Field
            className="block mt-4 w-full px-2 py-3 rounded-lg bg-input-purple placeholder-placeholder-purple"
            name="lname"
            placeholder="Last Name"
          />
          <Field
            className="block mt-4 w-full px-2 py-3 rounded-lg bg-input-purple placeholder-placeholder-purple"
            type="email"
            name="email"
            placeholder="Email"
          />
          <ErrorMessage name="email" component="div" />
          <Field
            className="block mt-4 w-full px-2 py-3 rounded-lg bg-input-purple placeholder-placeholder-purple"
            type="password"
            name="password"
            placeholder="Password"
          />
          <Field
            className="block mt-4 w-full px-2 py-3 rounded-lg bg-input-purple placeholder-placeholder-purple "
            type="password"
            name="password2"
            placeholder="Confirm Password"
          />
          <ErrorMessage name="password" component="div" />

          <button
            type="submit"
            disabled={isSubmitting}
            className="block mt-4 w-full px-2 py-3 rounded-lg bg-signup-button text-white hover:bg-signup-button-hover shadow-xl shadow-placeholder-purple  "
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

export default SignupForm;
