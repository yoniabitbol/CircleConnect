import React from "react";
import { Field } from "formik";
import { useState, useEffect } from "react";
import getUserBackdrop from "../../../http/getUserBackdrop";

const Banner: React.FC<{
  banner: {
    name: string;
    title: string;
    location: string;
    email: string;
    phone: string;
    website: string;
    connections: number;
    picture: string;
    backdrop: string;
  };

  edit: boolean;
  formik: any;
}> = ({ banner, edit, formik }) => {
  const [backdropUrl, setBackdropUrl] = useState("");
  console.log(banner.backdrop);

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const url = await getUserBackdrop(banner.backdrop);
        setBackdropUrl(url);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserProfile();
  }, [banner.backdrop]);

  return (
    <div>
      {edit ? (
        <div className="w-full pb-5 rounded-md bg-slate-200 mx-auto">
          <div className="w-2/3 mx-auto pt-5">
            <label className="text-sm font-semibold text-gray-600 py-2">
              Backdrop URL
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
              Profile Picture URL
            </label>
            <Field name="picture" className="w-full rounded-sm" type="text" />

            <label className="text-sm font-semibold text-gray-600 py-2">
              Name
            </label>
            <Field name="name" className="w-full rounded-sm" type="text" />

            <label className="text-sm font-semibold text-gray-600 py-2">
              Title
            </label>
            <Field name="title" className="w-full rounded-sm" type="text" />

            <label className="text-sm font-semibold text-gray-600 py-2">
              Location
            </label>
            <Field name="location" className="w-full rounded-sm" type="text" />

            <label className="text-sm font-semibold text-gray-600 py-2">
              Email
            </label>
            <Field name="email" className="w-full rounded-sm" type="text" />

            <label className="text-sm font-semibold text-gray-600 py-2">
              Phone
            </label>
            <Field name="phone" className="w-full rounded-sm" type="text" />

            <label className="text-sm font-semibold text-gray-600 py-2">
              Website
            </label>
            <Field name="website" className="w-full rounded-sm" type="text" />
          </div>

          <div>
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full m-5"
            >
              Save Profile
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
              src={banner.picture}
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
              {banner.connections} Connections
            </h1>
          </div>

          <div>
            <button
              type="submit"
              className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full m-5"
            >
              Edit Profile
            </button>
          </div>

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
