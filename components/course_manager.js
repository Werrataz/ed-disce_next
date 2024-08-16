import React from "react";
import { useHistory } from "react-router-dom";
import course_manager from "../config/language.config";

function CourseManager({ courses }) {
  const history = useHistory();

  const handleCourseClick = (course) => {
    const url = `management/cours/${course.publicIdentifier}/`;
    history.push(url);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {courses.map((course, index) => (
        <div
          key={index}
          onClick={handleCourseClick}
          style={{ border: "1px solid black", margin: "5px", padding: "5px" }}
        >
          <h3>{course.name}</h3>
          <p>Subject Studied: {course.subjectStudied}</p>
          {course.shared && <p>{course_manager.sharedMessage}</p>}
          {course.shared && (
            <p>
              {course_manager.accessCodeMessage} {course.accessCode}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

export default CourseManager;
