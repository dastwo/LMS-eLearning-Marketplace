import {useContext, useState} from 'react'
import {Context} from '../../context/index'
import axios from 'axios'
import Link from 'next/link'
import {Button} from 'antd'
import {SettingOutlined, UserSwitchOutlined, LoadingOutlined} from '@ant-design/icons'
import {tost} from 'react-toastify'
import UserRoute from '../../components/routers/UserRoute'
const BecomeInstructor = () => {
  const [loading, setLoading] = useState(false)
  const {state:{user}} =useContext(Context)


  const becomeInstructor = async ()=>{
    try {
      setLoading(true)
      const {data} = await axios.post('/api/make-instructor')
      console.log(data);
      window.location.href = data
      setLoading(false)
    } catch (err) {
      setLoading(false)
      console.log('becomeInstructor ERROR', err);
    }
  }
  return (
    <>
    <h1 className='text-center'>become Instructor</h1>
    <div class="container">
    <div className='row'>
      <div className='col-md-6 offset-md-3 text-center'>
        <div className='pt-4'>
          <UserSwitchOutlined className='display-1 pb-3'/>
          <br/>
          <h2>Setup payout to publish courses on Descamy</h2>
          <p className='lead text-warning'>
          Descamy partners with stripe to transfer earnings to your bank
                account
          </p>
          <Button className='mb-3 ' type='primary' block shape='round' icon={loading ? <LoadingOutlined/> : <SettingOutlined/>}
          size='large' onClick={becomeInstructor} disabled={user && user.role && user.role.includes('Instructor')}>
            {loading ? 'Processing' : 'Payout Setup'}
          </Button>
          <p className='lead'> 
          You will be redirected to stripe to complete onboarding process.
          </p>
        </div>
      </div>
      </div>  
    </div>
    </>
  )
}

export default BecomeInstructor