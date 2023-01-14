import SignupForm from "../components/login_signup/signup_form";

const signup = (props) => {
  return (
    <div className="flex justify-center space-x-48">
      <div className="flex flex-1 justify-center bg-red-500">
        <h1 className="underline">CircleConnect</h1>
        <h2>Connect, Collaborate, and Grow Your Circle</h2>
      </div>
      <div className="w-1/2">
        <div className="w-1/2 mx-auto">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default signup;
