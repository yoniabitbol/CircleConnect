import useGoogle from "../../../hooks/useGoogle";
import { useTranslation } from "react-i18next";

const ThirdPartyLogin: React.FC = () => {
  const { loginGoogle } = useGoogle();
  const {t} = useTranslation();

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center mt-10">
        <div className="flex flex-row items-center">
          <div className="mx-2"> {t('loginAndRegistration.label.continueWith')}</div>
        </div>
        <div className="flex justify-center items-center w-1/2 mt-5">
          <div className="w-1/2">
            <div className="flex justify-center">
              <img
                onClick={loginGoogle}
                className="cursor-pointer"
                src="https://img.icons8.com/color/48/000000/google-logo.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyLogin;
