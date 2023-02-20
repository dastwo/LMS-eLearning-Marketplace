import {useState, useEffect} from 'react'
import axios from 'axios'
import CourseCard from '../components/card/CourseCard';


const index = ({courses}) => {
 
  return (
    <>
      <h1 className="text-center">Online Courses</h1>

      <div className='container-fluid'>
        <div className='row'>
          {courses.map((course)=>(
            <div key={course._id} className="col-md-4">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(){
  const {data} = await axios.get(`${process.env.API}/courses`)
  
  return { props: {courses: data } }
}

export default index;
