import { useState, useEffect } from "react";
import { applicationType } from "../../../../../Models/UserProfileModel";
import { Usertypes } from "../../../../UserProfile";
import getCoverLetter from "../../../../../http/getCoverLetter";
import getResume from "../../../../../http/getResume";

interface DownloadCVProps {
  applicant: Usertypes;
  postID: string;
}

const DownloadCV: React.FC<DownloadCVProps> = ({ applicant, postID }) => {
  const [coverletter, setCoverletter] = useState<string | undefined>(undefined);
  const [resume, setResume] = useState<string | undefined>(undefined);

  useEffect(() => {
    applicant.applications.map((application: applicationType) => {
      if (application.postID === postID) {
        getCoverLetter(application.coverLetter).then((res) => {
          if (res) setCoverletter(res);
          else setCoverletter(undefined);
        });
        getResume(application.resume).then((res) => {
          if (res) setResume(res);
          else setResume(undefined);
        });
      }
    });
  }, []);

  return (
    <div className="flex mt-2">
      {coverletter ? (
        <a
          href={coverletter}
          download
          className="text-xs block w-auto px-3 py-1 rounded-md bg-signup-button
          text-white hover:bg-signup-button-hover mr-3"
        >
          Download Cover Letter
        </a>
      ) : null}
      {resume ? (
        <a
          href={resume}
          download
          className="text-xs block w-auto px-3 py-1 rounded-md bg-signup-button
          text-white hover:bg-signup-button-hover"
        >
          Download Resume
        </a>
      ) : null}
    </div>
  );
};

export default DownloadCV;
