import { useState, useEffect, createElement } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import { PlayCircleOutlined, MenuFoldOutlined,  MenuUnfoldOutlined, BorderOutlined, CheckSquareFilled  } from "@ant-design/icons";

const { Item } = Menu;
const SingleCourse = () => {

  
  const [lessonsCompleted, setLessonsCompleted] = useState([]);
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [updateState, setUpdateState] = useState(false);

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  useEffect(() => {
    if (course) loadCompletedLessons();
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
        courseId: course._id
    });
    setLessonsCompleted(data);
  };
  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`,{
        courseId: course._id,
        lessonId: course.lessons[clicked]._id
    });

   setLessonsCompleted([...lessonsCompleted, course.lessons[clicked]._id])
  };

  const markIncomplete = async () => {
    const { data } = await axios.post(`/api/mark-incomplete`,{
        courseId: course._id,
        lessonId: course.lessons[clicked]._id
    });

    let all = lessonsCompleted
    const index = all.indexOf(course.lessons[clicked]._id)

if(index > -1){
    all.splice(index, 1)
        setLessonsCompleted(all)
        setUpdateState(!updateState)
    }


  };

  return (
    <StudentRoute>
      <div className="row">
        <div style={{ maxWidth: 320 }}>
            <Button onClick={()=>setCollapsed(!collapsed)} className="text-primary mt-1 btn-block mb-2">{createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)} {!collapsed && 'Lessons'}</Button>
          <Menu
            defaultSelectedKeys={clicked}
            inlineCollapsed={collapsed}
            style={{ height: "80vh", overflow: "scroll" }}
          >
            {course.lessons?.map((lesson, index) => (
              <Item
                icon={<Avatar>{index + 1}</Avatar>}
                onClick={() => setClicked(index)}
                key={index}
              >
                {lesson.title.substring(0, 30)}{" "} {lessonsCompleted.includes(lesson._id) ? <CheckSquareFilled className="float-end"/> : <BorderOutlined className="float-end"/>}
              </Item>
            ))}
          </Menu>
        </div>
        <div className="col">
          {clicked !== -1 ? (
            <>

            <div className="col alert bg-primary ">
                <b>{course.lessons[clicked].title}</b>
                {lessonsCompleted.includes(course.lessons[clicked]._id) ? (<span className="float-end pointer" onClick={markIncomplete}> mark incomplete</span>) : (<span className="float-end pointer" onClick={markCompleted}>Mark completed</span>)}
            </div>
              {course.lessons[clicked].video &&
                course.lessons[clicked].video.Location && (
                  <>
                    <div className="wrapper">
                      <ReactPlayer
                        className="player"
                        url={course.lessons[clicked].video.Location}
                        width="100%"
                        height="100%"
                        controls
                        onEnded={()=> markCompleted()}
                      />
                    </div>
                  </>
                )}
              <ReactMarkdown
                children={course.lessons[clicked].content}
                className="single-post"
              />
            </>
          ) : (
            <div className="d-flex justify-content-center p-5">
              <div className="text-center p-5">
                <PlayCircleOutlined className="text-primary" />
                <p className="lead">Click on the lessons to start learning</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
