import axios from "axios";
import { useState, useEffect } from "react";
import InstructorRoute from "../../components/routes/InstructorRoute";
import { Avatar } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import Link from "next/link";
const Instructor = () => {
  const [courses, setCourses] = useState([]);

  const loadCourses = async () => {
    const { data } = await axios.get("/api/instructor-courses");
    setCourses(data);
  };
  useEffect(() => {
    loadCourses();
  }, []);

  const myStyle = { marginTop: "-15px", fontSize: "10px" };

  return (
    <InstructorRoute>
      <h1 className="text-center">Instructor</h1>
      {courses &&
        courses.map((course) => (
          <>
            <div className="card mb-3">
              <div className="row">
              <Avatar
              className="col-md-2"
                size={100}
                shape
                src={course.image ? course.image.Location : "/course.png"}
              />

                  <div className="col-md-9">
                    <Link href={`/instructor/course/view/${course.slug}`}>
                      <h6 className="pt-2"> {course.name}</h6>
                    </Link>
                    <p>{course.description}</p>
                    <p>{course.lessons.length} lessons</p>
                    {course.lessons.length < 5 ? (
                      <p style={myStyle} className="text-warning">
                        At lest 5 lessons are required to publish a course
                      </p>
                    ) : course.published ? (
                      <p style={myStyle} className="text-success">
                        Your course is live in the marketplace
                      </p>
                    ) : (
                      <p style={myStyle} className="text-success">
                        Your course is ready to published{" "}
                      </p>
                    )}
                  </div>
                  <div className="col-md-1 pt-2">
                    {course.published ? (
                      <div>
                        <CheckCircleOutlined className="text-success h4" />
                      </div>
                    ) : (
                      <div>
                        <CloseCircleOutlined className="text-warning h4" />
                      </div>
                    )}
                  </div>
              </div>
            </div>
          </>
        ))}
      
    </InstructorRoute>
  );
};

export default Instructor;
