interface ApplicantRowProps {
  applicant: string;
}

const ApplicantRow: React.FC<ApplicantRowProps> = ({ applicant }) => {
  return (
    <div>
      <p className="mx-2">{applicant}</p>
    </div>
  );
};

export default ApplicantRow;
