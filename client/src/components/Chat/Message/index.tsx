import { useEffect, useState, FC } from "react";
import getMessageFile from "../../../http/getMessageFile";
import { Download } from "@mui/icons-material";
import { Chip } from "@mui/material";
import FilterMessage from "./filterMessages";

const Message: FC<{
  outbound: boolean;
  text: string;
  file: string | null;
}> = ({ outbound, text, file }) => {
  const textBoxStyle = outbound
    ? "bg-slate-100 dark:secondary-dark"
    : "bg-indigo-700 text-sky-50 w-fit";
  const [fileData, setFileData] = useState<string | null>(null);
  useEffect(() => {
    if (file) {
      getMessageFile(file).then((res: any) => {
        setFileData(res);
      });
    }
  }, [file]);
  if ((!text || text == "") && !fileData) return null;
  return (
    <div className={`mt-3  grid ${outbound && "justify-items-end"}`}>
      {outbound ? <span className="" /> : <span />}
      {text && (
        <div className={"rounded-md px-3 py-1" + " " + textBoxStyle}>
          <FilterMessage text={text} />
        </div>
      )}
      {fileData && (
        <div className="flex justify-end w-full mt-2">
          <a download href={fileData}>
            <Chip
              clickable
              sx={{
                backgroundColor: `${outbound ? "#4D47C3" : "#F1F5F9"}`,
                color: `${outbound ? "white" : "#4D47C3"}`,
                "&:hover": { backgroundColor: `${outbound && "#3d389a"}` },
              }}
              icon={
                <Download
                  color="primary"
                  sx={{ color: `${outbound ? "white" : "#4D47C3"}` }}
                />
              }
              label={
                file?.substring(0, 10) +
                `${file && file?.length > 20 && "..."}` +
                file?.substring(file?.length - 10, file?.length)
              }
            />
          </a>
        </div>
      )}
    </div>
  );
};

export default Message;
