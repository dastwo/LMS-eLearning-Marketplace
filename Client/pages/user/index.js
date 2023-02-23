import { useContext, useEffect, useState } from "react";
import { Context } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import axios from "axios";
import Link from "next/link";
import {Avatar} from 'antd'
import {SyncOutlined, PlayCircleOutlined} from '@ant-design/icons'

const UserIndex = () => {

  const [ course, setCourses] = useState([])
  const [ loading, setLoading] = useState(false)
  const {
    state: { user },
  } = useContext(Context);

  useEffect(()=>{
    loadCourses()
  },[])

  const loadCourses = async ()=>{
    try {
      setLoading(true)
      const {data} = await axios.get(`/api/user-courses`)
      setCourses(data)
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log(err);
      
    }
  }

  return (
    <UserRoute>
      {loading && <SyncOutlined spin className="d-flex justify-content-center display-1 text-danger p-5"/>}
      <h1 className="text-center">
      User dashboard 
      </h1>
      {course && course.map(course => (
        <div className="card pt-2 pb-1">
          <Avatar size={80} shape='square' src={course.image ? course.image.Location : 'course.png'}/>

          <div className="card-body ">
            <div className="row">
              <div className="col">
                <Link href={`/user/course/${course.slug}`} className='pointer-event'>
                  <h5 className="mt-2 text-primary">{course.name}</h5>
                </Link>
                <p style={{marginTop:'-10'}}>{course.lessons.length} Lessons</p>
                <p className="text-muted">By {course.instructor.name}</p>
              </div>
              <div className="col-md-3 mt-3 text-center">
                <Link href={`/user/course/${course.slug}`} >
                  <PlayCircleOutlined className="h2 pointer-event text-primary"/>
                </Link>

              </div>
            </div>
          </div>
        </div>
      ))}

    </UserRoute>
  );
};

export default UserIndex;
