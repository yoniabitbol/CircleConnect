import React from "react";
import Usertypes from "../../../Models/UserProfileModel";

const Courses: React.FC<{ courses: Usertypes["courses"]; edit: boolean }> = ({
  courses,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  edit,
}) => {
  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Courses</h1>
      {courses.map((course, index) => {
        return (
          <div key={index} className="flex flex-col justify-center mb-5">
            <h1 className="text-lg font-semibold pt-2">{course.title}</h1>
            <h2 className="">{course.number}</h2>
            <h3 className="pt-2"> {course.description}</h3>
          </div>
        );
      })}
    </div>
  );
};

export default Courses;
