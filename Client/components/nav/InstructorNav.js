import Link from 'next/link'
const InstructorNav = () => {
  return (
    <div className='nav flex-column nav-pills mt-2'>
        <Link  href='/instructor' className='nav-link active'>
        Instructor
        </Link>
        <Link  href='/instructor/course/create' className='nav-link active'>
        Course Create
        </Link>
    </div>
  )
}

export default InstructorNav