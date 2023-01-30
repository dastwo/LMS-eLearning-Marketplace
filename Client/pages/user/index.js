import {useContext} from 'react'
import { Context } from '../../context'
import UserRoute from '../../components/routers/UserRoute'

export const UserIndex = () => {
    const {state: {user}} = useContext(Context)
   
  return (
    <UserRoute>

     <h1 className='text-center'>
         <pre>{JSON.stringify(user)}</pre>
     </h1>
    </UserRoute>
  )
}

export default UserIndex
