// import placeholder from "../placeholder.png";

const JobPosting: React.FC = () => {
  return (
    <div>
      <div className="flex mt-2 lg:text-xs mr-3 bg-input-purple px-2 py-2">
        <a href="/" className="mx-2">
          Applicant Name
        </a>
        <div className="">
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="text-xs block w-auto px-3 py-1 rounded-md bg-signup-button
            text-white hover:bg-signup-button-hover"
          >
            Download
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobPosting;
