import {useEffect, useState} from 'react'
import UserRoute from '../../components/routes/UserRoute'
import { CloudSyncOutlined } from '@ant-design/icons'


const StripeCancel = () => {
  return (
    <UserRoute showNav={false}>
        <div className='row text-center'>
            <div className='col-md-9'>
                <CloudSyncOutlined className='display-1 text-danger p-5'/>
                <p className='lead'>Payment failed. Try again.</p>
            </div>
        </div>
        <div className='col-md-3'></div>
    </UserRoute>
  )
}

export default StripeCancel