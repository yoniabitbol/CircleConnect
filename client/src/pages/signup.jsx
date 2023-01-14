import SignupForm from "../components/login_signup/signup_form";
import { Link } from "react-router-dom";

const signup = (props) => {
  return (
    <div className="flex justify-center">
      <div className="w-1/2">
        <div className="h-full flex">
          <div className="block w-1/2 mx-auto self-center">
            <h1 className="text-4xl font-bold">CircleConnect</h1>
            <h2 className="text-2xl font-medium mt-3">
              Connect, Collaborate, and Grow Your Circle
            </h2>
            <div className="font-medium mt-3">
              If you already have an account <br /> You can{" "}
              <Link className="text-blue-500">Login here</Link>
            </div>
          </div>
        </div>
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
