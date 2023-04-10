import {useEffect, useState, FC} from 'react';
import { ConnectionType } from "../../Routes/Network";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import getUserProfilePic from '../../http/getUserPicturePic';

const ConnectionRow: FC<ConnectionType> = (props:ConnectionType) => {
  const [picture, setPicture] = useState<any>();
  const {t} = useTranslation();
  const ConnectionClickHandler = () => {
    setTimeout(() => {
      window.location.reload();
    }, 1)
  }

  useEffect (() => {
    getUserProfilePic(props.picture).then((res:any) => {
      setPicture(res);
    })
  },[])

  return (
    <div className="flex justify-center sm:text-left text-center py-2">
      <div className="flex items-center gap-4 p-4 sm:text-sm text-xs w-full sm:w-7/12 bg-white">
        <Link key={props.user_id} to={`/profile/${props.user_id}`} onClick={ConnectionClickHandler}>
        <div className="">
          <img
            src={picture}
            className="w-16 rounded-full md:align-center"
          ></img>
        </div>
        </Link>
        <div className="grow py-2">
          <Link key={props.user_id} to={`/profile/${props.user_id}`} onClick={ConnectionClickHandler}>
          <p className="font-bold">{props.name}</p>
          </Link>
          <p className="text-gray-500">{props.title}</p>
          <p className="text-gray-500">{props.connections.length} {t('common.label.connectionLc')}</p>
        </div>

        <div className="">
          <button
            type="submit"
            className="block lg:mt-4 w-auto px-5 py-2 rounded-md bg-signup-button
               text-white hover:bg-signup-button-hover"
          >
            {t('common.label.message')}
          </button>
        </div>
        <div className="">
          <button type="submit">
            <b>•••</b>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionRow;