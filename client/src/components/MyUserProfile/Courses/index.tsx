import Divider from "@mui/material/Divider";
import React, { useState } from "react";
import Usertypes from "../../../Models/UserProfileModel";

const Courses: React.FC<{ courses: Usertypes["courses"]; edit: boolean }> = ({
  courses,
  edit,
}) => {
  const [addOrDelete, setAddOrDelete] = useState(false);

  const addNewBtn = (
    <button
      type="button"
      className="bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full my-5"
      onClick={() => {
        courses.push({
          title: "",
          number: "",
          school: "",
          startDate: "",
          endDate: "",
          description: "",
        });
        // Force form to re-render
        setAddOrDelete(!addOrDelete);
      }}
    >
      Add new
    </button>
  );

  const deleteBtn = (index: number) => {
    return (
      <button
        type="button"
        className="bg-red-500 text-white rounded-full px-2 my-2"
        onClick={() => {
          courses.splice(index, 1);
          // Force form to re-render
          setAddOrDelete(!addOrDelete);
        }}
      >
        Delete
      </button>
    );
  };

  function courseFields(index: number) {
    return (
      <>
        <label className="text-sm font-semibold text-gray-600 py-2">
          Title
        </label>
        <input
          name={`courses[${index}].title`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={courses[index].title || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            courses[index].title = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Number
        </label>
        <input
          name={`courses[${index}].number`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={courses[index].number || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            courses[index].number = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          School
        </label>
        <input
          name={`courses[${index}].school`}
          className="w-full rounded-sm"
          type="text"
          defaultValue={courses[index].school || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            courses[index].school = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Description
        </label>
        <input
          name={`courses[${index}].description`}
          className="w-full rounded-sm"
          defaultValue={courses[index].description || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            courses[index].description = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          Start Date
        </label>
        <input
          name={`courses[${index}].startDate`}
          className="w-full rounded-sm"
          type="textarea"
          defaultValue={courses[index].startDate || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            courses[index].startDate = e.target.value;
          }}
        />
        <label className="text-sm font-semibold text-gray-600 py-2">
          End Date
        </label>
        <input
          name={`courses[${index}].endDate`}
          className="w-full rounded-sm"
          defaultValue={courses[index].endDate || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            courses[index].endDate = e.target.value;
          }}
        />
        {deleteBtn(index)}
      </>
    );
  }

  const existingcourses = courses.map((_, index) => {
    return (
      <React.Fragment key={index}>
        <div className="my-5">{courseFields(index)}</div>
        <Divider />
      </React.Fragment>
    );
  });

  const form = (
    <div className="pt-5">
      {existingcourses}
      {addNewBtn}
    </div>
  );

  const component = edit ? (
    form
  ) : courses.length < 1 ? (
    <p>Add at least 1 course</p>
  ) : (
    <div className="grid grid-cols-2 gap-4 my-4">
      {courses.map((course) => {
        return (
          <div
            key={course.title}
            className="flex flex-col bg-white rounded-md p-5"
          >
            <h1 className="text-lg font-semibold pt-2">{course.title}</h1>
            <h2 className="">{course.number}</h2>
            <h3 className=""> {course.description}</h3>
            <h3 className="text-sm">
              {course.startDate} → {course.endDate}
            </h3>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Courses</h1>
      {component}
    </div>
  );
};

export default Courses;
