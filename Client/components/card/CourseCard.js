import {Card, Badge} from 'antd'
import Link from 'next/link'
import { currencyFormatter } from '../../utils/helpers'

const {Meta} = Card

const CourseCard = ({course})=>{
    const {name, instructor, price, image, slug, paid, category} = course

return (
    <Link href={`/course/${slug}`} className=''>
        <Card className='mb-4' cover={ <img src={image && image.Location ? image.Location : '/course.png'} alt={name} style={{height:'200px'}} className='p-1'/>}>
            <h2 className='fw-bold'>{name}</h2>
            <p>by {instructor.name}</p>
            <Badge count={category} style={{background: '#3a0f4'}} className='pb-2 ' />
            <h4 className='pt-2'>{paid ? currencyFormatter({amount: price, currency: 'usd'}) : 'Free'}</h4>
        </Card>
    </Link>
)
}

export default CourseCard
