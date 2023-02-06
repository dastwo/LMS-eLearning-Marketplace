import { useState, useEf, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip } from "antd";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import ReactMarkdown from 'react-markdown'

const CourseView = () => {
  const [course, setCourse] = useState({});

  const router = useRouter();
  const { slug } = router.query;
  const loadCorse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };
  useEffect(() => {
    loadCorse();
  }, [slug]);

  return (
    <InstructorRoute>
      <div className="container-fluid pt-3">
        {course && (
         
            <div className="card">
              <div className="row">
                <div className="col-md-1 pt-2 ">
                  <Avatar
                    size={80}
                    src={course.image ? course.image.Location : "/course.png"}
                  />
                </div>

                <div className="col-md-9">
                  <h5 className="mt-2 text-primary">{course.name}</h5>
                  <p style={{ marginTop: "-10px", }}>
                    {course.lessons && course.lessons.length} lessons
                  </p>
                  <p style={{ marginTop: "-15px", fontSize: "10px" }}>
                    {course.category}
                  </p>
                </div>
            <div className="d-flex col-md-1 pt-4">
              <Tooltip title="Edit">
                <EditOutlined  className="text-warning me-3"/>
              </Tooltip>
              <Tooltip title="Publish">
                <CheckOutlined  className="text-danger"/>
              </Tooltip>
            </div>
              </div>
            <div className="row pt-4 ps-2">
              <div className="col">
                <ReactMarkdown children={course.description}/>
              </div>
            </div>
            </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
