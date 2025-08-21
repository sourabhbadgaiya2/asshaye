import React from "react";
import CourseCardSimple from "./CourseCardSimple";

export const CoursesAllGrid = ({ courses, loading, error }) => {
  if (loading) return <p>Loading courses...</p>;
  if (error) return <p className='text-danger'>{error}</p>;
  if (!courses || courses.length === 0) return <p>No courses found.</p>;

  // 1️⃣ Group courses by Judiciary name
  const groupedCourses = courses.reduce((groups, course) => {
    const key = course?.subsubCategory?.name || "Unknown Judiciary";
    if (!groups[key]) groups[key] = [];
    groups[key].push(course);
    return groups;
  }, {});

  return (
    <div className='container'>
      <div className='row g-4'>
        {Object.entries(groupedCourses).map(([judiciaryName, grouped]) => (
          <React.Fragment key={judiciaryName}>
            {grouped.map((course) => (
              <div key={course._id} className='col-lg-4 col-md-6 col-sm-12'>
                <CourseCardSimple
                  course={course}
                  currentFilter={{ judiciaryName }}
                />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
