import { useState } from "react";
import { applicationType } from "../../../../../Models/UserProfileModel";
import { Usertypes } from "../../../../UserProfile";

interface DownloadCVProps {
  applicant: Usertypes;
  postID: string;
}

const DownloadCV: React.FC<DownloadCVProps> = ({ applicant, postID }) => {
  const [fileName, setFileName] = useState("");
  // console.log(applicant);
  // console.log(postID);
  return (
    <div>
      <div>
        <div className="">
          <a
            href={fileName}
            download
            onClick={(e) => {
              e.preventDefault();
              applicant.applications.map((application: applicationType) => {
                if (application.postID === postID) {
                  setFileName(application.coverLetter);
                }
              });
            }}
            className="text-xs block w-auto px-3 py-1 rounded-md bg-signup-button
          text-white hover:bg-signup-button-hover"
          >
            Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default DownloadCV;
