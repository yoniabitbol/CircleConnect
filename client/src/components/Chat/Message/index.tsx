import {useEffect, useState,FC} from 'react';
import getMessageFile from '../../../http/getMessageFile';
import {FilePresent} from '@mui/icons-material';

const Message: FC<{
  outbound: boolean;
  text: string;
  file: string | null;
}> = ({ outbound, text, file }) => {
  const textBoxStyle = outbound ? "bg-slate-100" : "bg-indigo-700 text-sky-50";
  const [fileData, setFileData] = useState<string | null>(null);
  useEffect(() => {
    if (file) {
      getMessageFile(file).then((res:any) => {
          console.log(res)
        setFileData(res);
      });
    }
  },[file]);
  console.log('fileData: ', fileData)
  return (
    <div>
      {outbound ? <span className="" /> : <span />}
      <div className={"rounded-md inline-block px-3 py-1 " + textBoxStyle}>
        <span>{text}</span>
        {fileData && <a download href={fileData}><FilePresent /></a>}
      </div>
    </div>
  );
};

export default Message;
