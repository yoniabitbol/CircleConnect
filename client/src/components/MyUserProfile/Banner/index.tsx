import React from "react";
import { Field } from "formik";
import { useState, useEffect } from "react";
import getUserBackdrop from "../../../http/getUserBackdrop";
import getUserProfilePic from "../../../http/getUserPicturePic";
import { useTranslation } from "react-i18next";

const Banner: React.FC<{
  banner: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    website: string;
    connections: string[];
    picture: string;
    backdrop: string;
  };

  edit: boolean;
  formik: any;
}> = ({ banner, edit, formik }) => {
  const [backdropUrl, setBackdropUrl] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const {t} = useTranslation();

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        if (banner.backdrop === "" || banner.picture === "") return;
        const backdropUrl = await getUserBackdrop(banner.backdrop);
        const profilePicUrl = await getUserProfilePic(banner.picture);

        setBackdropUrl(backdropUrl);
        setProfilePicUrl(profilePicUrl);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfile();
  }, [banner.backdrop, banner.picture]);

  return (
    <div>
      {edit ? (
        <div className="w-full pb-5 rounded-md bg-slate-200 mx-auto">
          <div className="w-2/3 mx-auto pt-5">
            <label className="text-sm font-semibold text-gray-600 py-2">
            {t('editProfile.label.backdropURL')}
            </label>
            {/* <Field name="backdrop" className="w-full rounded-sm" type="text" /> */}
            <input
              id="file"
              name="backdrop"
              type="file"
              className="w-full rounded-sm"
              onChange={(event) => {
                const file: FileList | null = event.currentTarget.files;
                if (!file) return;
                else {
                  formik.setFieldValue("backdrop", file[0]);
                }
              }}
            />

            <label className="text-sm font-semibold text-gray-600 py-2">
            {t('editProfile.label.profilePictureURL')}
            </label>
            {/* <Field name="picture" className="w-full rounded-sm" type="text" /> */}
            <input
              id="file"
              name="picture"
              type="file"
              className="w-full rounded-sm"
              onChange={(event) => {
                const file: FileList | null = event.currentTarget.files;
                if (!file) return;
                else {
                  formik.setFieldValue("picture", file[0]);
                }
              }}
            />

            <label className="text-sm font-semibold text-gray-600 py-2">
            {t('editProfile.label.name')}
            </label>
            <Field name="name" className="w-full rounded-sm" type="text" />

            <label className="text-sm font-semibold text-gray-600 py-2">
            {t('editProfile.label.title')}
            </label>
            <Field name="title" className="w-full rounded-sm" type="text" />

            <label className="text-sm font-semibold text-gray-600 py-2">
            {t('editProfile.label.location')}
            </label>
            <Field name="location" className="w-full rounded-sm" type="text" />

            <label className="text-sm font-semibold text-gray-600 py-2">
            {t('editProfile.label.email')}
            </label>
            <Field name="email" className="w-full rounded-sm" type="text" />

            <label className="text-sm font-semibold text-gray-600 py-2">
            {t('editProfile.label.phone')}
            </label>
            <Field name="phone" className="w-full rounded-sm" type="text" />

            <label className="text-sm font-semibold text-gray-600 py-2">
            {t('editProfile.label.website')}
            </label>
            <Field name="website" className="w-full rounded-sm" type="text" />
          </div>

          <div>
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full m-5"
            >
               {t('editProfile.buttons.saveProfile')}
            </button>
          </div>

          {/* click contact info to display a modal */}
          {/* <div className="flex flex-col justify-center ml-5">
        <h1 className="text-lg font-semibold ">{banner.email}</h1>
        <h1 className="text-lg font-semibold ">{banner.phone}</h1>
        <h1 className="text-lg font-semibold ">{banner.website}</h1>
      </div> */}
        </div>
      ) : (
        <div className="w-full pb-5 rounded-md bg-slate-200 mx-auto">
          <div>
            <img
              className="w-full lg:h-64 h-32 object-cover rounded-t-md"
              src={backdropUrl}
              alt="backdrop"
            />
          </div>
          <div className="flex justify-center -mt-16">
            <img
              className="w-32 h-32 rounded-full border-2 border-white"
              src={profilePicUrl}
              alt="profile"
            />
          </div>
          <div className="flex flex-col justify-center ml-5">
            <h1 className="text-2xl font-bold ">{banner.name}</h1>
            <h2 className="text-lg font-semibold">{banner.title}</h2>
            <h3 className="text-lg font-semibold">{banner.location}</h3>
          </div>
          <div className="flex flex-col justify-center mt-5 ml-5">
            <h1 className="text-lg font-semibold ">
              {banner.connections.length}  {t('editProfile.label.connections')}
            </h1>
          </div>
          {formik != null ? (
            <div>
              <button
                type="submit"
                className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full m-5"
              >
                 {t('editProfile.buttons.editProfile')}
              </button>
            </div>
          ) : (
            <div></div>
          )}
          {/* click contact info to display a modal */}
          {/* <div className="flex flex-col justify-center ml-5">
        <h1 className="text-lg font-semibold ">{banner.email}</h1>
        <h1 className="text-lg font-semibold ">{banner.phone}</h1>
        <h1 className="text-lg font-semibold ">{banner.website}</h1>
      </div> */}
        </div>
      )}
    </div>
  );
};

export default Banner;
