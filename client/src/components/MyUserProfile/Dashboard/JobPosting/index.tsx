import placeholder from "./placeholder.png";

const JobPosting: React.FC = () => {
  return (
    <div className="flex bg-white mt-2">
      <div className="ml-2 mr-4 my-3">
        <img
          src={placeholder}
          className="w-16 rounded-full md:align-center"
        ></img>
      </div>
      <div className="grow py-2">
        <a href="/" className="font-bold">
          Job Title
        </a>
        <p className="text-sm">Company Name</p>
        <p className="text-sm">Location</p>
        <p className="text-sm" style={{ color: "#4c47bc" }}>
          0 applicants
        </p>
      </div>
    </div>
  );
};

export default JobPosting;
