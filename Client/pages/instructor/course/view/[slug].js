import { useState, useEf, useEffect } from "react";
import { useRouter } from "next/router";
import InstructorRoute from "../../../../components/routes/InstructorRoute";
import axios from "axios";
import { Avatar, Tooltip, Button, Modal, List } from "antd";
import { EditOutlined, CheckOutlined, UploadOutlined } from "@ant-design/icons";
import ReactMarkdown from 'react-markdown'
import AddLessonForm from "../../../../components/forms/AddLessonForm";
import {toast} from 'react-toastify'
const {Item} = List;

const CourseView = () => {
  const [course, setCourse] = useState({});
  const [visible, setVisible] = useState(false);
  const [values, setValues] = useState({
    title: "",
    content: "",
    video: {},
  });
  const [uploading, setUploading] = useState(false);
  const [uploadButtonText, setUploadButtonText] = useState("Upload Video");
  const [progress, setProgress] = useState(0)

  const router = useRouter();
  const { slug } = router.query;
 
  useEffect(() => {
    loadCourse();
  }, [slug]);


  const loadCourse = async () => {
    const { data } = await axios.get(`/api/course/${slug}`);
    setCourse(data);
  };


  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      setUploading(true)
      const {data} = await axios.post(`/api/course/lesson/${slug}/${course.instructor && course.instructor._id}`, values)
      setValues({...values, video:{}, content:'', title:''})
      setCourse(data)
      setVisible(false)
      setUploadButtonText('Upload video')
      toast.success('Lesson added')
      setUploading(false)
    } catch (err) {
      setUploading(false)
      console.log(err);
      toast.error('Lesson added failed')
    }
  };

  const handleVideo = async (e) => {
    try {
      setUploading(true)
      const file = e.target.files[0];
    setUploadButtonText(file.name);
    const videoData = new FormData()
    videoData.append('video', file)

    const {data} = await axios.post(`/api/course/video-upload/${course.instructor._id}`, videoData, {
      onUploadProgress: (e)=>{
        setProgress(Math.round((100 * e.loaded) / e.total))
      }
    })
    setValues({...values, video: data})
    toast.success('Video upload success')
    setUploading(false)
    } catch (err) {
      setUploading(false)
      console.log(err);
      toast.error('Video upload failed')
    }
  
  };

  const handleVideoRemove = async ()=>{
    try {
      setUploading(true)
      const {data} = await axios.post(`/api/course/video-remove/${course.instructor._id}`, {video: values.video})
      toast.success('Video removed success')
      setValues({...values, video: {}})
      setUploading(false)
      setUploadButtonText('Upload antour video')
    } catch (err) {
      setUploading(false)
      console.log(err);
      toast.error('Remove video failed')
    }
  }
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
                <EditOutlined  className="text-warning me-3" onClick={()=> router.push(`/instructor/course/edit/${slug}`)}/>
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
            <div className="row">

            <Button onClick={()=> setVisible(true)}
            className='col-md-6 offset-md-3 text-center'
            type="primary"
            size="large"
            icon={<UploadOutlined/>}
            shape='round'
            
            >
Upload lessons
            </Button>
            </div>
            <br/>
            <Modal title='+ Add lesson' centered open={visible} onCancel={()=> setVisible(false)}
            footer={null}
            >
              <AddLessonForm
              values={values}
              setValues={setValues}
              handleAddLesson={handleAddLesson}
              uploading={uploading}
              uploadButtonText={uploadButtonText}
              handleVideo={handleVideo}
              progress={progress}
              handleVideoRemove={handleVideoRemove}
              />
            </Modal>

            <div className="row pb-5">
              <div className="col lesson-list">
                <h4>
                  {course && course.lessons && course.lessons.length} lessons
                </h4>
                <List itemLayout="horizontal" dataSource={course && course.lessons} renderItem={(item, index)=>(
                  <Item>
                    <Item.Meta avatar={<Avatar>{index +1}</Avatar>} title={item.title}></Item.Meta>
                  </Item>
                )}>

                </List>
              </div>

            </div>
            </div>
        )}
      </div>
    </InstructorRoute>
  );
};

export default CourseView;
