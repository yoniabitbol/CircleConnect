// import placeholder from "../placeholder.png";

import Usertypes from "../../../../../Models/UserProfileModel";

interface ApplicantRowProps {
  applicant: Usertypes;
  postID: string;
}

const ApplicantRow: React.FC<ApplicantRowProps> = ({ applicant, postID }) => {
  return (
    <div>
      <div className="flex mt-2 lg:text-xs mr-3 bg-input-purple px-2 py-2">
        <a href="/" className="mx-2">
          {applicant.name}
        </a>
        <div className="">
          <button
            onClick={(e) => {
              e.preventDefault();
              applicant.applications.map((application) => {
                if (application.postID === postID) {
                  console.log(application.postID, application.coverLetter);
                }
                return;
              });
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

export default ApplicantRow;
