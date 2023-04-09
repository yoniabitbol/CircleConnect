interface ApplicantRowProps {
  applicant: string;
}

const ApplicantRow: React.FC<ApplicantRowProps> = ({ applicant }) => {
  return (
    <div>
      <div className="flex mt-2 lg:text-xs mr-3 bg-input-purple px-2 py-2">
        <p className="mx-2">{applicant}</p>
        <div className="">
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="text-xs block w-auto px-3 py-1 rounded-md bg-signup-button
          text-white hover:bg-signup-button-hover"
          >
            <a href="" download>
              Download
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantRow;
