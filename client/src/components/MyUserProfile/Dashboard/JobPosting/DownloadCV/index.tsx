import { useState, useEffect } from "react";
import { applicationType } from "../../../../../Models/UserProfileModel";
import { Usertypes } from "../../../../UserProfile";
// import { saveAs } from "file-saver";
import getCoverLetter from "../../../../../http/getCoverLetter";

interface DownloadCVProps {
  applicant: Usertypes;
  postID: string;
}

const DownloadCV: React.FC<DownloadCVProps> = ({ applicant, postID }) => {
  const [coverletter, setCoverletter] = useState<string | undefined>(undefined);
  // console.log(applicant);
  // console.log(postID);

  useEffect(() => {
    applicant.applications.map((application: applicationType) => {
      if (application.postID === postID) {
        getCoverLetter(application.coverLetter).then((res) => {
          if (res) setCoverletter(res);
          else setCoverletter(undefined);
        });
      }
    });
  }, []);

  return (
    <div>
      <div>
        <div className="">
          <a
            href={coverletter}
            download
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
