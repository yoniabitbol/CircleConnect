interface ApplicantRowProps {
  applicant: string;
  applicantID: string | undefined;
}

const ApplicantRow: React.FC<ApplicantRowProps> = ({
  applicant,
  applicantID,
}) => {
  return (
    <div>
      <a href={"/profile/" + applicantID} className="mx-2">
        {applicant}
      </a>
    </div>
  );
};

export default ApplicantRow;
