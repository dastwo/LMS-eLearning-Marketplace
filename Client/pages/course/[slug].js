import { useState, useEffect, useContext } from "react";
import axios from "axios";
import {useRouter} from 'next/router'
import { Context } from "../../context";
import SingleCourseCard from "../../components/card/SingleCourseCard";
import PreviewModal from "../../components/modal/PreviewModal";
import SingleCourseLesson from "../../components/card/SingleCourseLesson";
import {toast} from 'react-toastify'
import {loadStripe} from '@stripe/stripe-js'

const SingleCourse = ({course})=>{
    const [showModal, setShowModal] = useState(false)
    const [preview, setPreview] = useState('')
    const [loading, setLoading] = useState(false)
    const [enrolled, setEnrolled] = useState(false)
const {state:{user}} = useContext(Context)

const router = useRouter()
const {slug} = router.query

useEffect(()=>{
    if(user && course) checkEnrollment()
},[user, course])

const checkEnrollment = async ()=>{
    try{
        const {data} = await axios.get(`/api/check-enrollment/${course._id}`)
        
        setEnrolled(data)
    }catch(err){
        console.log(err);
    }
}

const handlePaidEnrollment = async () => {
    
try {
    if(!user) return router.push('/login')
    if(enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`)
    setLoading(true)
        const {data} = await axios.post(`/api/paid-enrollment/${course._id}`)

        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY)

        stripe.redirectToCheckout({sessionId: data})
        
        setLoading(false)
} catch (err) {
    console.log(err);
    setLoading(false)
    toast.error('Paid enrollment failed')
}

  };

  const handleFreeEnrollment = async (e) => {
    e.preventDefault()
    try {
        if(!user) return router.push('/login')
        if(enrolled.status) return router.push(`/user/course/${enrolled.course.slug}`)
        setLoading(true)
        const {data} = await axios.post(`/api/free-enrollment/${course._id}`)
        setLoading(false)
        toast.success(data.message)
        router.push(`/user/course/${data.course.slug}`)
    } catch (err) {
        toast.error('Enrollment failed. try agin')
        setLoading(false)
        console.log(err);
    }
  };

return (
    <>
   <SingleCourseCard course={course} setPreview={setPreview} setShowModal={setShowModal} showModal={showModal} preview={preview}  user={user} loading={loading} 
    handleFreeEnrollment={handleFreeEnrollment}
    handlePaidEnrollment={handlePaidEnrollment} enrolled={enrolled}/>
    <PreviewModal setShowModal={setShowModal} showModal={showModal} preview={preview}
    />

    {course.lessons && (
        <SingleCourseLesson lessons={course.lessons} setPreview={setPreview} setShowModal={setShowModal} showModal={showModal}/>
    )}
    </>
)
}

export async function getServerSideProps({query}){
    const {data} = await axios.get(`${process.env.API}/course/${query.slug}`)

    return {
        props: {course: data}
    }
}

export default SingleCourse;