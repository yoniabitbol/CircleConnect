import React from "react";
import Usertypes from "../../../Models/UserProfileModel";

const Courses: React.FC<{ courses: Usertypes["courses"] }> = ({ courses }) => {
  return (
    <div className="w-full p-5 rounded-md bg-slate-200 mx-auto">
      <h1 className="text-2xl font-bold ">Courses</h1>
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
    </div>
  );
};

export default Courses;
