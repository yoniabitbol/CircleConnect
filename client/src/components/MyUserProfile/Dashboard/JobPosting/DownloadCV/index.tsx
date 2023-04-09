import { useState } from "react";
import { applicationType } from "../../../../../Models/UserProfileModel";
import { Usertypes } from "../../../../UserProfile";
// import { saveAs } from "file-saver";

interface DownloadCVProps {
  applicant: Usertypes;
  postID: string;
}

const DownloadCV: React.FC<DownloadCVProps> = ({ applicant, postID }) => {
  const [fileName, setFileName] = useState("");
  // console.log(applicant);
  // console.log(postID);

  const saveFile = () => {
    applicant.applications.map((application: applicationType) => {
      if (application.postID === postID) {
        console.log("Entering...");
        setFileName(
          "../../../../../../../server\\public\\files\\applications\\coverLetter\\" +
            application.coverLetter
        );
      }
    });
    console.log("FILE: ", fileName);
    // saveAs(fileName, "Cover Letter.pdf");
  };

  return (
    <div>
      <div>
        <div className="">
          <button
            onClick={(e) => {
              e.preventDefault();
              saveFile();
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

export default DownloadCV;
