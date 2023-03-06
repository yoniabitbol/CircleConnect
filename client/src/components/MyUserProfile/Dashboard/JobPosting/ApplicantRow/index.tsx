import placeholder from "../placeholder.png";

const JobPosting: React.FC = () => {
  return (
    <div>
      <div className="flex mt-2 text-xs">
        <div className="ml-2 mr-4 my-3">
          <img
            src={placeholder}
            className="w-10 rounded-full md:align-center"
          ></img>
        </div>
        <div className="mt-5">Applicant Name</div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
        className="block w-auto px-3 py-1 rounded-md bg-signup-button
       text-white hover:bg-signup-button-hover"
      >
        Download application
      </button>
    </div>
  );
};

export default JobPosting;
